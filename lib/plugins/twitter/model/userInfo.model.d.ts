export interface UserByScreenNameParam {
    variables: Variables;
    features: Features;
}
interface Variables {
    screen_name: string;
    withSafetyModeUserFields: boolean;
}
interface Features {
    /**
     * true
     */
    creator_subscriptions_tweet_preview_api_enabled: boolean;
    /**
     * false
     */
    hidden_profile_likes_enabled: boolean;
    /**
     * true
     */
    highlights_tweets_tab_ui_enabled: boolean;
    responsive_web_graphql_exclude_directive_enabled: boolean;
    verified_phone_label_enabled: boolean;
    responsive_web_graphql_skip_user_profile_image_extensions_enabled: boolean;
    responsive_web_graphql_timeline_navigation_enabled: boolean;
    /**
     * true
     */
    subscriptions_verification_info_verified_since_enabled: boolean;
}
export interface UserByScreenNameResponse {
    errors: any;
    data: Data;
}
interface Data {
    id: string;
    name: string;
    username: string;
}
export {};
