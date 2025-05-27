export interface KlaviyoProfileAttributes {
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  organization: string;
  last_event_date: string;
  predictive_analytics: {
    historic_number_of_orders: number;
  };
  subscriptions: {
    email?: {
      marketing?: {
        consent: string;
      };
    };
  };
}
export interface KlaviyoPagination {
  next_cursor: string | null;
  prev_cursor: string | null;
  self: string;
}

export interface KlaviyoProfile {
  id: string;
  type: string;
  attributes: KlaviyoProfileAttributes;
}

export interface KlaviyoResponse {
  status: number;
  system_status: number;
  data: {
    results: KlaviyoProfile[];
    pagination: KlaviyoPagination;
  };
  message: string;
}


export interface KlaviyoEventResponse {
  data: {
    results: any[];
  };
}

