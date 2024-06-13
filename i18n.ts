import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {Pathnames, LocalePrefix} from 'next-intl/routing';
 
// Can be imported from a shared config

export const defaultLocale = 'en' as const;
export const locales = ['en', 'zh', 'ko'];

export const pathnames: Pathnames<typeof locales> = {
  '/': '/'
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});