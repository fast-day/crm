import { useMemo } from 'react'
import { CalendarCustomizationContext, type ICalendarCustomization } from '@/entities/calendar/model/utils/customization.util'
import { CalendarWeek, type ICalendarProps, type IEvent } from '@/entities/calendar'
import type { ISchedule } from '@/entities/schedule';

const data: IEvent[] = [
  {
    "id": "89815144-e574-4300-bece-8122607a9d2b",
    "status": "new",
    "tag": "B-0509-IR2F1CBB",
    "comment": null,
    "date": "2026-09-21",
    "start_time": "03:30",
    "end_time": "5:00",
    "subtotal": 10000,
    "payment_method": null,
    "order_id": "a9111ff6-1466-4647-a5fd-270a895bb1ad",
    "customer": {
      "id": "bab6af63-9959-4829-8414-06490ca7d96f",
      "phone": "+7 (900) 555 55-55",
      "full_name": "Вовка",
      "first_name": "Вовка",
      "last_name": "",
      "avatar": null
    },
    "booking_services": [
      {
        "booking_service_id": "2bd21090-b5f6-485e-a6e3-bebe2b830991",
        "booking_service_start_time": "11:30",
        "booking_service_end_time": "11:40",
        "booking_service_duration": 10,
        "booking_service_price": 1000,
        "booking_service_count": 10,
        "service": {
          "service_id": "2edb4239-cb0c-4eb4-a953-76168e3e16c0",
          "name": "тест 2",
          "mark": "green",
          "duration": 10,
          "avatar": null,
          "category": "тест",
          "prices": {
            "price": 1000,
            "cost_price": null
          }
        },
        "user": {
          "user_id": "5a4844eb-c1b5-46e9-b4bc-fc0ee988005b",
          "first_name": "Кирилл",
          "last_name": "Колесников",
          "full_name": "Кирилл Колесников",
          "phone": "+7 (961) 328 58-27",
          "avatar": "http://localhost:9000/user-avatars/8df70798a123bb3bfa41e18aa932dd09.jpeg"
        }
      }
    ],
    mark: 'red'
  },
  {
    "id": "b9fe8ab2-fa4c-47b9-b021-f7e8aa1a6afe",
    "status": "new",
    "tag": "B-2208-TVWDQY6O",
    "comment": null,
    "date": "2026-09-22",
    "start_time": "10:00",
    "end_time": "13:10",
    "subtotal": null,
    "payment_method": null,
    "order_id": null,
    "customer": {
      "id": "c0f234a5-6e98-411a-b52d-ac032386f5d0",
      "phone": "+7 (999) 999-99-99",
      "full_name": "Петрович",
      "first_name": "Петрович",
      "last_name": null,
      "avatar": null
    },
    "booking_services": [
      {
        "booking_service_id": "d60453b4-57af-4669-b7b4-8ef634eeb2c6",
        "booking_service_start_time": "10:00",
        "booking_service_end_time": "10:10",
        "booking_service_duration": 10,
        "booking_service_price": 100,
        "booking_service_count": 1,
        "service": {
          "service_id": "2edb4239-cb0c-4eb4-a953-76168e3e16c0",
          "name": "тест 2",
          "mark": "green",
          "duration": 10,
          "avatar": null,
          "category": "тест",
          "prices": {
            "price": 1000,
            "cost_price": null
          }
        },
        "user": {
          "user_id": "5a4844eb-c1b5-46e9-b4bc-fc0ee988005b",
          "first_name": "Кирилл",
          "last_name": "Колесников",
          "full_name": "Кирилл Колесников",
          "phone": "+7 (961) 328 58-27",
          "avatar": "http://localhost:9000/user-avatars/8df70798a123bb3bfa41e18aa932dd09.jpeg"
        }
      }
    ],
    mark: 'primary'
  },
  {
    "id": "b9fe8ab2-fa4c-47b9-b021-f7e8aa1a6afe",
    "status": "new",
    "tag": "B-2208-TVWDQY6O",
    "comment": null,
    "date": "2026-09-22",
    "start_time": "17:00",
    "end_time": "18:00",
    "subtotal": null,
    "payment_method": null,
    "order_id": null,
    "customer": {
      "id": "c0f234a5-6e98-411a-b52d-ac032386f5d0",
      "phone": "+7 (999) 999-99-99",
      "full_name": "Петрович",
      "first_name": "Петрович",
      "last_name": null,
      "avatar": null
    },
    "booking_services": [
      {
        "booking_service_id": "d60453b4-57af-4669-b7b4-8ef634eeb2c6",
        "booking_service_start_time": "10:00",
        "booking_service_end_time": "10:10",
        "booking_service_duration": 10,
        "booking_service_price": 100,
        "booking_service_count": 1,
        "service": {
          "service_id": "2edb4239-cb0c-4eb4-a953-76168e3e16c0",
          "name": "тест 2",
          "mark": "green",
          "duration": 10,
          "avatar": null,
          "category": "тест",
          "prices": {
            "price": 1000,
            "cost_price": null
          }
        },
        "user": {
          "user_id": "5a4844eb-c1b5-46e9-b4bc-fc0ee988005b",
          "first_name": "Кирилл",
          "last_name": "Колесников",
          "full_name": "Кирилл Колесников",
          "phone": "+7 (961) 328 58-27",
          "avatar": "http://localhost:9000/user-avatars/8df70798a123bb3bfa41e18aa932dd09.jpeg"
        }
      }
    ],
    mark: 'green'
  },
  {
    "id": "3829cbc4-3ea8-46f8-9935-eee82d2cf00f",
    "status": "new",
    "tag": "B-2208-VKH4CR2Y",
    "comment": null,
    "date": "2026-09-27",
    "start_time": "09:30",
    "end_time": "12:00",
    "subtotal": null,
    "payment_method": null,
    "order_id": null,
    "customer": {
      "id": "c0f234a5-6e98-411a-b52d-ac032386f5d0",
      "phone": "+7 (999) 999-99-99",
      "full_name": "Петрович",
      "first_name": "Петрович",
      "last_name": null,
      "avatar": null
    },
    "booking_services": [
      {
        "booking_service_id": "18564d63-ed5b-4237-9678-5d0623d8cb3d",
        "booking_service_start_time": "17:00",
        "booking_service_end_time": "17:10",
        "booking_service_duration": 10,
        "booking_service_price": 100,
        "booking_service_count": 1,
        "service": {
          "service_id": "2edb4239-cb0c-4eb4-a953-76168e3e16c0",
          "name": "тест 2",
          "mark": "green",
          "duration": 10,
          "avatar": null,
          "category": "тест",
          "prices": {
            "price": 1000,
            "cost_price": null
          }
        },
        "user": {
          "user_id": "5a4844eb-c1b5-46e9-b4bc-fc0ee988005b",
          "first_name": "Кирилл",
          "last_name": "Колесников",
          "full_name": "Кирилл Колесников",
          "phone": "+7 (961) 328 58-27",
          "avatar": "http://localhost:9000/user-avatars/8df70798a123bb3bfa41e18aa932dd09.jpeg"
        }
      }
    ],
    mark: 'purple',
  },
  {
    "id": "3829cbc4-3ea8-46f8-9935-eee82d2cf00f",
    "status": "new",
    "tag": "B-2208-VKH4CR2Y",
    "comment": null,
    "date": "2026-09-27",
    "start_time": "12:00",
    "end_time": "12:10",
    "subtotal": null,
    "payment_method": null,
    "order_id": null,
    "customer": {
      "id": "c0f234a5-6e98-411a-b52d-ac032386f5d0",
      "phone": "+7 (999) 999-99-99",
      "full_name": "Петрович",
      "first_name": "Петрович",
      "last_name": null,
      "avatar": null
    },
    "booking_services": [
      {
        "booking_service_id": "18564d63-ed5b-4237-9678-5d0623d8cb3d",
        "booking_service_start_time": "17:00",
        "booking_service_end_time": "17:10",
        "booking_service_duration": 10,
        "booking_service_price": 100,
        "booking_service_count": 1,
        "service": {
          "service_id": "2edb4239-cb0c-4eb4-a953-76168e3e16c0",
          "name": "тест 2",
          "mark": "green",
          "duration": 10,
          "avatar": null,
          "category": "тест",
          "prices": {
            "price": 1000,
            "cost_price": null
          }
        },
        "user": {
          "user_id": "5a4844eb-c1b5-46e9-b4bc-fc0ee988005b",
          "first_name": "Кирилл",
          "last_name": "Колесников",
          "full_name": "Кирилл Колесников",
          "phone": "+7 (961) 328 58-27",
          "avatar": "http://localhost:9000/user-avatars/8df70798a123bb3bfa41e18aa932dd09.jpeg"
        }
      }
    ],
    mark: 'purple',
  }
]


const MOCK_WORKING_HOURS: ISchedule[] = [
  {
    id: 38,
    date: "2026-09-27",
    intervals: [
      {
        start: "08:05",
        end: "12:45",
      },
    ],
  },
];

export const BookingCalendar = ({
  renderEvent,
  renderMonthEvent,
  renderAgendaEvent,
  selectedEventId,
  hourHeight,
  height,
  autoHeight,
  maxEventsPerDayCell,
  allDayMaxRows,
  onShowMore,
  classNames,
  dayCellClassName,
  formatTime,
}: ICalendarProps) => {

  const customization = useMemo<ICalendarCustomization>(
    () => ({
      renderEvent,
      renderMonthEvent,
      renderAgendaEvent,
      selectedEventId,
      hourHeight: hourHeight ?? 96,
      height,
      autoHeight,
      maxEventsPerDayCell: maxEventsPerDayCell ?? 4,
      allDayMaxRows,
      onShowMore,
      classNames,
      dayCellClassName,
      formatTime,
    }),
    [
      renderEvent,
      renderMonthEvent,
      renderAgendaEvent,
      selectedEventId,
      hourHeight,
      height,
      autoHeight,
      maxEventsPerDayCell,
      allDayMaxRows,
      onShowMore,
      classNames,
      dayCellClassName,
      formatTime,
    ]
  )

  return (
    <CalendarCustomizationContext.Provider value={customization}>
      <CalendarWeek
        singleDayEvents={data}
        workingHours={MOCK_WORKING_HOURS}
      />
    </CalendarCustomizationContext.Provider>
  )
}
