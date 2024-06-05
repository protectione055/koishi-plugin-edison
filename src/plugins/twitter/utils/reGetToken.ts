/*
 * @Author: Kabuda-czh
 * @Date: 2023-02-27 13:24:23
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-11 11:28:38
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\twitter\utils\reGetToken.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
import * as fs from 'node:fs'
import type { Context, Logger } from 'koishi'
import type { Page, CookieParam } from 'puppeteer-core'
import GeneratePath from '../../../config'

export async function getTwitterToken(ctx: Context, logger: Logger) {
  let page: Page, cookie: any, gtCookie: string

  try {
    const { twitterCookiePath } = GeneratePath.getInstance(ctx.baseDir).getGeneratePathData()
    logger.info('token 获取中...')
    page = await ctx.puppeteer.page()

    // 监听 request 事件
    const onRequest = (request: any) => {
      const guestToken = request.headers().Cookie
      if (guestToken !== undefined) {
        gtCookie = guestToken
        page.removeAllListeners('request')
      }
    }

    page.on('request', onRequest)

    await page.goto('https://twitter.com/')
    await page.waitForNetworkIdle()

    const cookieRegex = /([^=;\s]+)=([^=;\s]*)/g

    if (!cookieRegex.test(gtCookie) && !gtCookie)
      throw new Error('token 获取失败, 请检查是否在浏览器中正确登录 Twitter 账户')

    const cookieObject: {
      ct0: string
      auth_token: string
    } = {
      ct0: '',
      auth_token: '',
    }

    gtCookie.match(cookieRegex)?.forEach((cookie) => {
      const [key, value] = cookie.split('=')
      if (['ct0', 'auth_token'].includes(key))
        cookieObject[key] = value
    })

    await fs.promises.writeFile(
      twitterCookiePath,
      JSON.stringify({ cookieString: gtCookie, authCookie: { ...cookieObject } }),
    )

    ctx.http.config.headers['x-csrf-token'] = cookieObject.ct0
    ctx.http.config.headers.Cookie = gtCookie

    cookie = { cookieString: gtCookie, authCookie: { ...cookieObject } }

    logger.info('token 获取成功: ', cookieObject)
  }
  catch (error) {
    logger.error('token 获取失败: ', error.message)
    return { cookieString: '', authCookie: {} }
  }
  finally {
    page?.close()
  }

  return cookie
}

/*
 * 指定可以访问的playground
 */
const playGround: string[] = [
  'https://oauth-playground.glitch.me/?id=getUsersIdBookmarks&params=%28%27id*%7Emax_results*%29*%21%27asdf%27%01*_', 
  'https://oauth-playground.glitch.me/?id=usersIdBookmarksDelete&params=%28%27id%21%27114514%27%7Etweet_id%21%27ikuiku%27%29_'
]

/*
 * 从playground获取token
 */
export async function refresh_token(context: Context, cookie: string, logger: Logger) {
  let page: Page
  const playground_url: string = playGround[Math.floor(Math.random() * playGround.length)]

  if (!cookie.includes('token')) {
    logger.error('refresh_token: cookie不正确，请检查是否正确设置')
    return
  }
  
  try {
    page = await context.puppeteer.page();

    // DEBUG: 设置事件触发回调函数
    page.on('request', request => {
      logger.info('requesting url:', request.method(), request.url());
      // logger.info('request header:', request.headers());
    });
    page.on('requestfailed', request => {
      logger.error('request failed:', request.url());
    })
    page.on('response', response => {
        logger.info('reponse url:', response.url());
        logger.info('response status:', response.status());
        // logger.info('response header:', response.headers());
    });

    // 请求playground页面
    await page.setExtraHTTPHeaders({
      'Origin': 'https://twitter.com',
      'referer': 'https://twitter.com/',
      'Sec-Ch-Ua': '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99"',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0',
      'cookie': cookie
    })
    await page.goto(playground_url);
    await page.waitForNetworkIdle()
    logger.info('playground loaded')

    // DEBUG: 打印网页内容
    const content = await page.content()
    logger.info('点击RUN按钮')
    await page.click('[aria-label="Run this request"]')
    await page.waitForNetworkIdle()
    logger.info('page after clicking buttun: ', page.url())
    if (page.url() !== playground_url) {
      logger.info('refresh_token: 重定向到登陆页面')
      let oauth_buttun_selector = '#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010 > main > div > div > div.css-175oi2r.r-1mlwlqe.r-16y2uox.r-1q142lx > div > div > div.css-175oi2r.r-1awozwy.r-6koalj.r-q4m81j > div.css-175oi2r.r-11rk87y.r-1ur9v65 > button'
      await page.waitForNetworkIdle()
      // await page.click(oauth_buttun_selector)
      logger.info("获取授权页内容")
      const content = await page.content()
      // logger.info(`refresh_token: \n ${content}`)
    }

  }
  catch (error) {
    // const content = await page.content()
    // logger.info(`refresh_token: \n ${content}`)
    logger.error('refresh_token: ', error.message)
  }
}