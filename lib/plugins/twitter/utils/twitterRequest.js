"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwitterTweets = exports.getTwitterRestId = void 0;
const enum_1 = require("../enum");
async function getTwitterRestId(twitterId, http, logger) {
    delete http.config.headers['x-csrf-token'];
    delete http.config.headers['Cookie'];
    logger.info(`${JSON.stringify(http.config.headers)}`);
    const data = await http
        .get(`${enum_1.TwitterDynamicType.UserByScreenNameURL}/${twitterId}`, http.config.headers)
        .then((res) => {
        logger.error(`getTwitterRestId: ${JSON.stringify(res)}`);
        return [res?.data?.id, res?.data?.name];
    })
        .catch((err) => {
        if (['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED', 'ECONNABORTED'].includes(err.code))
            throw new Error('请求超时, 网络错误');
        logger.error(`error getTwitterRestId: ${err}`);
        return [];
    });
    return data;
}
exports.getTwitterRestId = getTwitterRestId;
async function getTwitterTweets(restId, ctx, logger, isPure = false, isListen = false) {
    const param = {
        variables: {
            userId: restId,
            count: 20,
            includePromotedContent: true,
            withQuickPromoteEligibilityTweetFields: true,
            // withSuperFollowsUserFields: true,
            // withDownvotePerspective: false,
            // withReactionsMetadata: false,
            // withReactionsPerspective: false,
            // withSuperFollowsTweetFields: true,
            withVoice: true,
            withV2Timeline: true,
        },
        features: {
            creator_subscriptions_tweet_preview_api_enabled: true,
            freedom_of_speech_not_reach_fetch_enabled: true,
            graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
            // interactive_text_enabled: true,
            longform_notetweets_consumption_enabled: true,
            // longform_notetweets_richtext_consumption_enabled: false,
            longform_notetweets_rich_text_read_enabled: true,
            longform_notetweets_inline_media_enabled: true,
            responsive_web_edit_tweet_api_enabled: true,
            responsive_web_enhance_cards_enabled: false,
            responsive_web_graphql_exclude_directive_enabled: true,
            responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
            responsive_web_graphql_timeline_navigation_enabled: true,
            responsive_web_media_download_video_enabled: false,
            // responsive_web_text_conversations_enabled: false,
            responsive_web_twitter_article_tweet_consumption_enabled: false,
            // responsive_web_twitter_blue_verified_badge_is_enabled: true,
            rweb_lists_timeline_redesign_enabled: true,
            standardized_nudges_misinfo: true,
            tweet_awards_web_tipping_enabled: false,
            tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
            tweetypie_unmention_optimization_enabled: true,
            verified_phone_label_enabled: false,
            // vibe_api_enabled: true,
            view_counts_everywhere_api_enabled: true,
        },
        fieldToggles: {
            withArticleRichContentState: false,
        },
    };
    let tokenError = false;
    delete ctx.http.config.headers['x-csrf-token'];
    delete ctx.http.config.headers['Cookie'];
    logger.info(`${JSON.stringify(ctx.http.config.headers)}`);
    logger.info(`${enum_1.TwitterDynamicType.UserTweetsURL}/${restId}/tweets`);
    // 获取用户昵称
    logger.info(`${enum_1.TwitterDynamicType.UserInfoURL}/${restId}`);
    const user_info = await ctx.http.get(`${enum_1.TwitterDynamicType.UserInfoURL}/${restId}`, ctx.http.config.headers)
        .then((res) => {
        logger.info(`${JSON.stringify(res)}`);
        return res.data;
    })
        .catch((err) => {
        throw new Error(`UserInfo获取失败: ${JSON.stringify(err)}`);
    });
    // 获取用户推文
    const res = await ctx.http
        .get(`${enum_1.TwitterDynamicType.UserTweetsURL}/${restId}/tweets`, ctx.http.config.headers)
        .then((res) => {
        return res;
    })
        .catch((err) => {
        logger.info(`${JSON.stringify(err)}`);
        if (err?.response?.status === 403) {
            tokenError = true;
            return err;
        }
        if (['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED', 'ECONNABORTED'].includes(err.code)) {
            if (isListen)
                return 'continue';
            else
                throw new Error('请求超时, 网络错误');
        }
        throw new Error(`UserTweetsResponse获取失败: ${JSON.stringify(err)}`);
    });
    if (tokenError)
        throw new Error('token 失效, 请使用 --ck 重新设置');
    if (res === 'continue')
        return { user_info: user_info, tweets: [] };
    if (!res)
        throw new Error('动态获取失败，请稍后再试');
    // 返回结果
    const tweets = {
        user_info: user_info,
        tweets: res.data
    };
    // logger.info(`getTwitterTweets res: ${JSON.stringify(res)}`)
    // logger.info(`getTwitterTweets res.tweets[0]: ${JSON.stringify(res.data[0])}`)
    // logger.info(`getTwitterTweets tweets.tweets: ${JSON.stringify(tweets.tweets)}`)
    return tweets;
}
exports.getTwitterTweets = getTwitterTweets;
