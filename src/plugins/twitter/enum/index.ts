/*
 * @Author: Kabuda-czh
 * @Date: 2023-02-17 14:45:05
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-03 09:46:55
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\twitter\enum\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
export enum TwitterDynamicType {
  // get user restId
  UserByScreenNameURL = 'https://api.twitter.com/2/users/by/username',
  // get user tweets
  UserTweetsURL = 'https://api.twitter.com/2/users',
  // get user dynamic info
  UserStatusURL = 'https://twitter.com/%s/status/%s',
  // get user media info
  UserMediaURL = 'https://twitter.com/i/api/graphql/Az0-KW6F-FyYTc2OJmvUhg/UserMedia',
  // get user info
  UserInfoURL = 'https://api.twitter.com/2/users',
}