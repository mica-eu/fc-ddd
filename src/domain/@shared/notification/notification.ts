interface NotificationErrorProps {
  context: string;
  message: string;
}

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(errors.map((error) => error.message).join(', '));
  }
}

export class Notification {
  private errors: { [key: string]: string[] } = {};

  addError(context: string, message: string): void {
    if (!this.errors[context]) {
      this.errors[context] = [];
    }
    this.errors[context].push(message);
  }

  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  getErrors(): { [key: string]: string[] } {
    console.log(this.errors);
    return this.errors;
  }

  getMessage(context?: string): string {
    if (!context) {
      return Object.keys(this.errors)
        .map((key) => this.getMessage(key))
        .join(', ');
    }
    return this.errors[context]?.length ? `${context}: ${this.errors[context].join(', ')}` : '';
  }
}
