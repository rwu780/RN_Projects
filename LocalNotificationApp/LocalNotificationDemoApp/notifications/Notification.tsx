import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {AndroidColor} from '@notifee/react-native';

var channelId = "";

async function createChannel() {
    if (channelId === "") {
        channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel'
        })
    }
}

export async function displayNotification(message: string) {
  await notifee.requestPermission();

  await createChannel();

  console.log('Channel ID', channelId);

  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}

export async function scheduleNotification(message: string) {
  const date = new Date(Date.now() + 5 * 1000);

  console.log('Trigger Time', date.toString());

  await createChannel();

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency.NONE,
  };

  await notifee.createTriggerNotification(
    {
      id: '123',
      title: 'Meeting soon',
      body: 'Meeting started',
      android: {
        channelId,
      },
    },
    trigger,
  );
}
