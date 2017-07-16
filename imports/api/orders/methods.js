import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Orders } from './orders';
import { OrdersSchema } from './OrdersSchema';

export const createOrder = new ValidatedMethod({
  name: 'Orders.create',
  validate: new SimpleSchema({
    order:{ type:OrdersSchema},
  }).validator(),

  run({order}) {
    const { userId } = this;

    if (!userId) {
     throw new Meteor.Error('You are not able to add a new order');
   }

   const defaultAnswer = {
     createdBy: userId,
     createdAt: new Date(),
     bill:[],
   };

   const orderToAdd = { ...defaultOrder, ...order};

   return Orders.insert(orderToAdd);
 },
});
export const removeOrder = new ValidatedMethod({
  name: 'Orders.remove',
  validate: new SimpleSchema({
    _id:{ type: String },
  }).validator(),

  run({ _id }){
    const order = Orders.findOne({ _id, createdBy: this.userId });

  if (!order) {
     throw new Meteor.Error('You aro no able to  remove this order');
   }

   return Orders.remove({ _id });
 },
});
