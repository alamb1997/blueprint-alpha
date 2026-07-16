export type Task = {
  id: string;
  title: string;
  priority: string;
  status: string;
  due_date: string | null;
  next_action: string | null;
  platform_name?: string | null;
  relationship_name?: string | null;
};

export type WaitingItem = {
  id: string;
  title: string;
  counterparty: string | null;
  requested_date: string | null;
  follow_up_date: string | null;
  status: string;
  impact: string | null;
};

export type FinanceItem = {
  id: string;
  title: string;
  payee: string | null;
  amount: number | null;
  due_date: string | null;
  status: string;
  item_type: string;
};

export type TimelineEvent = {
  id: string;
  event_date: string;
  title: string;
  description: string | null;
  event_type: string;
};
