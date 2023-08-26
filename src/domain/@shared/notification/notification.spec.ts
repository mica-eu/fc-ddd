import { Notification } from './notification';

describe('Notification', () => {
  it('returns errors by context', () => {
    const notification = new Notification();
    notification.addError('customer', 'name is required');
    notification.addError('customer', 'address is required');
    expect(notification.getMessage('customer')).toBe(
      'customer: name is required, address is required'
    );
    expect(notification.getMessage('product')).toBe('');
  });

  it('returns all messages', () => {
    const notification = new Notification();
    notification.addError('customer', 'name is required');
    notification.addError('customer', 'email is required');
    notification.addError('product', 'name is required');
    expect(notification.getMessage()).toBe(
      'customer: name is required, email is required, product: name is required'
    );
  });

  it('returns true if has errors', () => {
    const notification = new Notification();
    notification.addError('customer', 'name is required');
    expect(notification.hasErrors()).toBe(true);
  });
});
