import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays } from "date-fns";
import { Button } from "@/components/ui/button";

export default function DateRangePickerDialog({
  dateRange,
  setDateRange,
  children,
}: {
  dateRange: DateRange | undefined;
  setDateRange: (date: DateRange | undefined) => void;
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 5),
    to: undefined,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (dateRange) {
      setRange(dateRange);
    }
  }, [dateRange]);

  function handleConfirm() {
    setDateRange(range);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="w-[838px] border-none bg-white p-4"
        showClose={false}
      >
        <div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            formatters={{
              formatCaption: (month: Date) => {
                return format(month, "yyyy - MM");
              },
            }}
          />
          <div className="mt-5 flex justify-end border-t border-[#F0F1F5] pt-4">
            <Button
              onClick={handleConfirm}
              className="h-7 rounded-full border border-[#eee] hover:border-black"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
