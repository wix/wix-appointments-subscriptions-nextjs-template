const ids = {
  LAYOUT: {
    HEADER: 'page.header',
    FOOTER: 'page.footer',
  },
  HOME_PAGE: {
    HEADER: 'home.header',
    SERVICES_SECTION: 'home.section.services',
    BOOK_NOW_CTA: 'home.book-now.cta',
  },
  BOOK_NOW_PAGE: {
    HEADER: 'book-now.header',
  },
  SERVICE_LIST: {
    CONTAINER: 'service-list.container',
  },
  SERVICE_ITEM: {
    CONTAINER: 'service-item.container',
    BOOK_NOW_CTA: 'service-item.book-now.cta',
  },
  CALENDAR_PAGE: {
    HEADER: 'calendar-page.header',
  },
  CALENDAR: {
    NEXT_AVAILABLE_SLOT_CTA: 'calendar.next-available.cta',
    // use classname since react-day-picker does not allow adding test-ids
    DAY_WITH_SLOT_CLASSNAME: 'day_with_slot',
    SLOT_CTA: 'calendar.slot.cta',
    CHECKOUT_CTA: 'calendar.checkout.cta',
  },
  PLANS_PAGE: {
    HEADER: 'plans-page.header',
  },
  PLAN_LIST: {
    CONTAINER: 'plan-list.container',
  },
  PLAN_ITEM: {
    CONTAINER: 'plan-item.container',
    CHECKOUT_CTA: 'plan-item.checkout.cta',
  },
};

export default ids;
