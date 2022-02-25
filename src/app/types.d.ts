interface Window {
  angular: any;
}

type Message<Type = unknown> = {
  data: Type;
};

type BlipsRequest = {
  identifier: string;
  isBlipsRequest: boolean;
  commandCode: string;
  args: any[];
};

type BlipResponse = {
  isBlipsResponse: boolean;
  identifier: string;
  result: unknown;
};
