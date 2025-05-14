// app/api/autotweet/route.ts
import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';
import { tweets } from '@/lib/tweets';

export async function GET() {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  });

  try {
    for (const tweet of tweets) {
      await client.v2.tweet(tweet.content);
    }

    return NextResponse.json({ success: true, message: 'All tweets posted!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Tweeting failed' }, { status: 500 });
  }
}
