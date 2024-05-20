/*
 * @Author: Kabuda-czh
 * @Date: 2023-02-03 13:40:55
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-03 09:26:26
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\twitter\dynamic\listen.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
import type { Channel, Context, Dict, Logger } from 'koishi'
import type { DynamicNotifiction, Entry, Tweets } from '../model'
import { renderFunction } from './render'
import { logger } from '.'
import type { IConfig } from '.'

export async function* listen(
  list: Dict<
    [
      Pick<Channel, 'id' | 'guildId' | 'platform' | 'twitter'>,
      DynamicNotifiction,
    ][]
  >,
  request: (restId: string, ctx: Context, logger: Logger, isPure?: boolean, isListen?: boolean) => Promise<Tweets>,
  ctx: Context,
  config: IConfig,
) {
  while (true) {
    const entries = Object.entries(list)
    if (entries.length === 0) {
      yield
      continue
    }
    logger.info(`开始轮询 ${entries.length} 个用户`)
    for (const [restId, notifications] of entries) {
      if (notifications.length === 0)
        continue
      const time = notifications[0][1].lastUpdatedId
      try {
        const items = await request(restId, ctx, logger, config.usePure, true)
        const user_info = items.user_info
        if (items.tweets.length === 0)
          continue
        // 记录最新的twitterId
        if (!notifications[0]?.[1].lastUpdatedId) {
          notifications.forEach(
            ([, notification]) =>
              (notification.lastUpdatedId
                = items.tweets[0].id),
          )
          continue
        }
        const neo = items.tweets.filter(
          item => { return item.id > time }
        ) || []
        if (neo.length !== 0) {
          const rendered = await Promise.all(
            neo.map(item => renderFunction(ctx, item, user_info, config)),
          )

          rendered.forEach((text, index) => {
            notifications.forEach(([channel, notification]) => {
              notification.lastUpdatedId = neo[index].id
              ctx.bots[notification.botId]?.sendMessage(
                channel.id,
                text,
                channel.guildId,
              )
            })
          })
        }
      }
      catch (e) {
        logger.error(`轮询 Error: ${e}`)
      }
      yield
    }
  }
}
