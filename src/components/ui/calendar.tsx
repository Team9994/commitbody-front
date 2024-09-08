'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale'; // Import Korean locale from date-fns
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const formatCaption = (date: Date) => {
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}.`;
};

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = false, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays} // Do not show days outside the current month
      locale={ko} // Set the locale to Korean
      className={cn(
        'w-80 pt-4 pb-6 rounded-16 bg-backgrounds-sub flex justify-center items-center text-white',
        className
      )}
      classNames={{
        months: 'w-full flex flex-col space-y-4',
        month: 'space-y-4',
        caption: 'flex justify-center items-center pt-1 relative', // Center the caption
        caption_label: 'text-lg font-medium text-white', // Style for the month and year
        nav: 'flex items-center gap-2 justify-center', // Center the nav buttons
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-5 w-5 p-0 text-white bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent'
        ), // Remove background color on interaction
        nav_button_previous: 'absolute left-20', // Adjust left navigation button position
        nav_button_next: 'absolute right-20', // Adjust right navigation button position
        table: 'w-full flex flex-col items-center justify-center border-collapse',
        head_row: 'flex',
        head_cell: 'text-[#EDEDED] w-11 text-center font-normal text-xs', // Weekday labels color
        row: 'flex w-full',
        cell: 'h-11 w-11 text-center p-0 relative', // Day cell styles
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-11 w-11 p-[12px] font-normal text-[#999999] focus:text-blue rounded-full aria-selected:bg-transparent active:bg-transparent focus:bg-transparent hover:bg-transparent'
        ),
        day_selected: 'bg-blue-500 text-[#EDEDED] rounded-full', // Selected day style
        day_today: 'text-blue-400 font-semibold', // Today’s date style
        day_outside: 'hidden', // Hide outside days
        day_disabled: 'text-gray-500 opacity-50', // Disabled days style
        day_hidden: 'invisible', // Hidden days
        ...classNames,
      }}
      components={{
        IconLeft: (props) => <ChevronLeft {...props} className="h-5 w-5 text-white" />,
        IconRight: (props) => <ChevronRight {...props} className="h-5 w-5 text-white" />,
      }}
      formatters={{
        formatCaption: (date) => formatCaption(date),
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
