import { Notification, NotificationProps, NotificationSize } from 'hds-react';
import uniqueId from 'lodash/uniqueId';
import React, {
  CSSProperties,
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

export type NotificationsContextProps = {
  addNotification: (props: NotificationProps) => void;
};

export const NotificationsContext = createContext<
  NotificationsContextProps | undefined
>(undefined);

const NOTIFICATION_OFFSET = 24;
const NOTIFICATION_Z_INDEX = 1000;
const AUTO_CLOSE_DURATION = 10000;

const getNotificationStyle = (
  heights: number[],
  index: number
): CSSProperties => {
  const topMargin = heights
    .slice(0, index)
    .reduce(
      (acc, curr) => acc + curr + NOTIFICATION_OFFSET,
      NOTIFICATION_OFFSET
    );

  return {
    top: topMargin,
    transform: 'translate3d(0px, 0px, 0px)',
    zIndex: NOTIFICATION_Z_INDEX,
  };
};

export const NotificationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = useCallback((props: NotificationProps) => {
    setNotifications((items) => [
      ...items,
      { ...props, id: uniqueId('notification-') },
    ]);
  }, []);

  const value = useMemo<NotificationsContextProps>(
    () => ({ addNotification }),
    [addNotification]
  );

  const heights = useMemo(
    () =>
      // Height of last added notification is 0 because it's not rendered yet.
      // In this case it doesn't matter because it's not used for top-margin calculation
      notifications.map(
        ({ id }) => document.getElementById(id as string)?.clientHeight ?? 0
      ),
    [notifications]
  );

  return (
    <NotificationsContext.Provider value={value}>
      {notifications.map((props, index) => {
        return (
          <Notification
            notificationAriaLabel={
              typeof props.label === 'string' ? props.label : undefined
            }
            autoCloseDuration={AUTO_CLOSE_DURATION}
            autoClose={true}
            {...props}
            size={NotificationSize.Medium}
            style={getNotificationStyle(heights, index)}
            key={props.id}
            position="top-right"
            onClose={() =>
              setNotifications((items) =>
                items.filter((i) => i.id !== props.id)
              )
            }
          />
        );
      })}
      {children}
    </NotificationsContext.Provider>
  );
};
