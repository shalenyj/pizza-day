import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const OrdersSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  createdAt: { type: Date, optional: true },
  createdBy: { type: String, optional: true },
  eventId: { type: String, optional: true },
  bill: { type: Object, optional: true },
});
