export interface INotifier {
    initializeNotifier(key: string): void;

    sendNotification(name: string, body?: any, type?: string): void;
}
