import { type ClassValue, clsx } from "clsx";
import { sample } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function calculateTime(seconds: number) {
  const days = Math.floor(seconds / (60 * 60 * 24)); // 计算天数
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60)); // 计算小时数

  return {
    days,
    hours,
  };
}

export function getDomainName(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (error) {
    console.error("Invalid URL:", error);
    return url;
  }
}

export function generateRandomCode(length = 8) {
  const upLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const characters = upLetters + lowLetters + numbers;

  let result: string = sample(upLetters)!;

  for (let i = 1; i < length; i++) {
    result += sample(characters);
  }

  return result;
}
