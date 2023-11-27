import { ApplicationError } from '@/protocols';

export function forbiddenError(): ApplicationError {
  return {
    name: 'Forbidden',
    message: 'You do not have the necessary permission.',
  };
}