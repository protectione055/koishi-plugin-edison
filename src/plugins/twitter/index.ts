/*
 * @Author: Kabuda-czh
 * @Date: 2023-01-29 14:43:27
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-03-22 17:10:45
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\twitter\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
import type { Context } from 'koishi'
import { Quester, Schema } from 'koishi'
import * as dynamic from './dynamic'
import { refresh_token } from './utils'
import { logger } from '../../basic'

export interface TwitterChannel { }

export const inject = ['puppeteer']

declare module 'koishi' {
  interface Channel {
    twitter: TwitterChannel
  }
}

export interface IConfig {
  dynamic: dynamic.IConfig
  quester: Quester.Config
}

export const Config: Schema<IConfig> = Schema.object({
  dynamic: dynamic.Config.description(
    '动态监听 (使用 dynamic 指令管理监听对象)',
  ),
  quester: Quester.Config.description('twitter 请求配置'),
})

export function apply(context: Context, config: IConfig) {
  context.guild().command('edison/twitter', '使用 help twitter 查看功能指引')

  context.model.extend('channel', {
    twitter: {
      type: 'json',
      initial: {},
    },
  })

  let bearer_token = config.dynamic.bearer_key;
    
  const ctx = context.isolate('http')
  ctx.http = context.http.extend({
    headers: {
      'User-Agent': 'PostmanRuntime/7.31.0',
      'Authorization': `Bearer ${bearer_token}`,
      ...config.quester.headers,
    },
    ...config.quester,
  })

  ctx.plugin(dynamic, config.dynamic)

  // refresh_token(ctx, config.dynamic.cookie, dynamic.logger)

}
