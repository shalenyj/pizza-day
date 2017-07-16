import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const EventsSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  createdBy: { type: String, optional: true },
  createdAt: { type: Date, optional: true },
  groupId: { type: String, optional: true },
  title: { type: String, optional: true },
  link: { type: String, optional: true },
  status: { type: String, optional: true },
  participations: { type: [String], optional: true },
});
