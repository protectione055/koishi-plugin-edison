/*
 * @Author: Kabuda-czh
 * @Date: 2023-04-06 11:03:23
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-24 11:51:57
 * @FilePath: \KBot-App\plugins\kbot\src\config\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
import { resolve } from 'node:path'

interface GeneratePathData {
  baseDir: string
  edisonDir: string

  fontsDir: string
  renderFontsDir: string
  statusFontsDir: string

  imagesDir: string
  statusImagesDir: string
  tarotImagesDir: string

  bilibiliDir: string
  bilibiliCookiePath: string
  bilibiliVupPath: string

  twitterDir: string
  twitterCookiePath: string
  twitterTokenPath: string
}

class GeneratePath {
  private static instance: GeneratePath
  private generatePathData: GeneratePathData

  private constructor(path: string) {
    // baseDir
    const baseDir = resolve(__dirname, path)

    // edison-data
    const edisonDir = resolve(baseDir, 'edison-data')

    // fonts
    const fontsDir = ''
    const renderFontsDir = ''
    const statusFontsDir = ''

    // images
    const imagesDir = ''
    const statusImagesDir = ''
    const tarotImagesDir = ''

    // bilibili
    const bilibiliDir = resolve(edisonDir, 'bilibili')
    const bilibiliCookiePath = resolve(bilibiliDir, 'cookie.json')
    const bilibiliVupPath = resolve(bilibiliDir, 'vup.json')

    // twitter
    const twitterDir = resolve(edisonDir, 'twitter')
    const twitterCookiePath = resolve(twitterDir, 'cookie.json')
    const twitterTokenPath = resolve(twitterDir, 'token.json')

    this.generatePathData = {
      baseDir,
      edisonDir: edisonDir,
      fontsDir,
      renderFontsDir,
      statusFontsDir,
      imagesDir,
      statusImagesDir,
      tarotImagesDir,
      bilibiliDir,
      bilibiliCookiePath,
      bilibiliVupPath,
      twitterDir,
      twitterCookiePath,
      twitterTokenPath,
    }
  }

  public static getInstance(path: string): GeneratePath {
    if (!this.instance)
      this.instance = new GeneratePath(path)

    return this.instance
  }

  public setFontsDir(fontsDir: string) {
    this.generatePathData.fontsDir = fontsDir
    this.generatePathData.renderFontsDir = resolve(fontsDir, 'render')
    this.generatePathData.statusFontsDir = resolve(fontsDir, 'status')
  }

  public setImagesDir(imagesDir: string) {
    this.generatePathData.imagesDir = imagesDir
    this.generatePathData.statusImagesDir = resolve(imagesDir, 'status')
    this.generatePathData.tarotImagesDir = resolve(imagesDir, 'tarot')
  }

  public getGeneratePathData(): GeneratePathData {
    return this.generatePathData
  }
}

export default GeneratePath
