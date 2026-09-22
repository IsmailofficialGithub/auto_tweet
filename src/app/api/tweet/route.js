import { TwitterApi } from 'twitter-api-v2';
import { NextResponse } from 'next/server';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const users = [
  '@user1',
  '@user2',
  '@user3',
  '@user4',
  '@user5',
  '@user6',
  '@user7',
  '@user8',
  '@user9',
  '@user10',
];

const message = 'Hello! This is your daily update. 🚀';

export async function GET() {
  try {
    for (const user of users) {
      await twitterClient.v2.tweet(`${user} ${message}`);
    }

    return NextResponse.json({ success: true, message: 'Tweets sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to tweet' }, { status: 500 });
  }
}
