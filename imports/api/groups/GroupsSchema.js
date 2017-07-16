import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const GroupsSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  createdAt: { type: Date, optional: true },
  createdBy: { type: String, optional: true },
  participations: { type: [String], optional: true },
  groupName: { type: String, optional: true },
  link: { type: String, optional: true },
  menu: { type: [Object], optional: true },
});
