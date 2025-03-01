export interface ListDevicesApiProps {
  page: string | number;
  limit: string | number;
  search_string: string;
  status: string;
  order_by: string;
  order_type: string;
  latitude: string;
  longitude: string;
  radius: string;
  nearbyme: any;
  location: string;
}
