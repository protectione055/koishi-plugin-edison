/*
 * @Author: Ziming Zhang
 * @Date: 2024-06-09
 * @LastEditors: Ziming Zhang
 * @LastEditTime: 2024-06-09
 * @Description: 
 *
 * Copyright (c) 2024 by Ziming Zhang, All Rights Reserved.
 */
import type { Context, Session } from 'koishi'
import { Schema, h } from 'koishi'
import { logger } from '../../basic'

import CanvasService, { Canvas, Image } from '@koishijs/canvas';
import Undios from '@cordisjs/plugin-http'

export interface MontageChannel { }

export const inject = ['canvas']

declare module 'koishi' {
  interface Channel {
    montage: MontageChannel
  }
}

export interface IConfig { }

export const Config: Schema<IConfig> = Schema.object({ })

async function montageImage(canvasService: CanvasService, imgs: string[]): Promise<Buffer> {
  const http = new Undios()
  const imgNum = imgs.length
  // 从 HTML 字符串中提取 src 属性
  const extractImageUrl = (htmlString: string): string => {
    const srcMatch = htmlString.match(/src\s*=\s*"([^"]+)"/i);
    return srcMatch ? srcMatch[1] : '';
  };

  // 访问所有imgs中的图片元素，下载图片并存到一个数组中
  var imgArr: Image[] = []
  var maxWidth: number = 0, maxHeight: number = 0
  for (let i = 0; i < imgNum; i++) {
    const data = await http.get(extractImageUrl(imgs[i]))
    var img: Image = await canvasService.loadImage(data)
    imgArr.push(img)
    maxWidth = img.naturalWidth > maxWidth ? img.naturalWidth : maxWidth
    maxHeight += img.naturalHeight
  }

  // 将所有图片绘制到新的canvas上
  var canvas: Canvas = await canvasService.createCanvas(maxWidth, maxHeight)
  const ctx = canvas.getContext('2d');
  let currentY = 0;
  for (const img of imgArr) {
    ctx.drawImage(img, 0, currentY);
    currentY += img.naturalHeight;
  }
  
  return canvas.toBuffer("image/png")
}

function splitImgNodes(str: string): string[] {
  const imgTagRegex = /<img\b[^>]*>/gi;
  const imgTags: string[] = str.match(imgTagRegex);
  return imgTags ? imgTags : []
}

async function montageHandler(session: Session<never, never, Context>, canvas: CanvasService, imgs: string[], batchSize: number) {
  // 一次最多处理batchSize张图片
  const imgNum = imgs.length
  const batchNum = Math.ceil(imgNum / batchSize)
  var promises: Promise<h>[] = [];
  for (let i = 0; i < batchNum; i++) {
    const start = i * batchSize
    const end = Math.min((i + 1) * batchSize, imgNum)
    const batchImgs = imgs.slice(start, end)
    const img = await montageImage(canvas, batchImgs)
    session.send(h.image(img, 'image/png'))
  }
}

/*
 * 默认将当前对话所有图片合成为一张图，如果有指定张数参数则按照指定的张数拼接
 */ 
export async function apply(context: Context, config: IConfig) {
  context.guild().command('edison/montage', '蒙太奇(montage)插件可以将多张图片拼接为长图，使用示例：montage -b 3 [图片1] [图片2] ... [图片n]. 注意QQ对话框限制一次最多只能发送20张图片')
  
  context.command('montage <imgs>', '将当前对话中的图片合成为一张长图')
    .option('batch', '-b <number> 设定每batch张图片拼接为一张', { fallback: 9999 })
    .action(({ session, options }, imgs) => {
      // 将标签分割为数组
      logger.info(`imgs: ${imgs}`)
      session.send(`正在处理图片...请稍等片刻`)
      const splitNodes: string[] = splitImgNodes(imgs)
      logger.info(`splitNodes: ${splitNodes}`)
      montageHandler(session, context.canvas, splitNodes, options.batch)
    })
}
