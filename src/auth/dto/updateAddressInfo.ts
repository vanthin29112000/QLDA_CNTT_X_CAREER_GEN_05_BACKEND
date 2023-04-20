export class UpdateAddressInfo {
  readonly city: {
    id: string;
    name: string;
  };
  readonly ward: {
    id: string;
    name: string;
  };
  readonly district: {
    id: string;
    name: string;
  };
  readonly mainAddress: string;
}
