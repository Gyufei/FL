export function formatTimestamp(timestamp: string | number) {
  const currentDate = new Date();
  const date = new Date(Number(timestamp));

  const isSameDay = currentDate.toDateString() === date.toDateString();
  const isCurrentYear = currentDate.getFullYear() === date.getFullYear();

  let formattedDate = "";
  if (isSameDay) {
    formattedDate = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (isCurrentYear) {
    formattedDate =
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
      " " +
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else {
    formattedDate =
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
      " " +
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
  }

  return formattedDate;
}

export function formatTimeDuration(seconds: number) {
  const secs = seconds % 60;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (hours % 24 === 0) {
      return `${days}d`;
    }
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    if (minutes % 60 === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${secs}s`;
  }
}

export function formatTimeObj(secs: number) {
  const minutes = Math.floor(secs / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const formattedTime = {
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: secs % 60,
  };

  return formattedTime;
}

export function formatTimestampEn(timestamp: number) {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const date = new Date(timestamp);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}
