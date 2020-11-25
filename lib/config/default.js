/* eslint-disable no-undef */
const config = {
  /**
   * How many keys you could get from S3 API at once, default to 1000.
   * 
   * You should increase this value if you get an alert said not enough keys.
   */
  maxKeys: 1000,

  /**
   * Config for S3 Fetch event. Require Read-Only permission.
   * 
   * All params below should declare as Workers' Environment Variable.
   * 
   * And for security reason, you should at least declare 
   * AWS_ACCESS_KEY_SECRET as Workers' Secret Environment Variable.
   */
  s3: {
    accessKey: AWS_ACCESS_KEY_ID,
    secretKey: AWS_ACCESS_KEY_SECRET,
    region: AWS_S3_REGION,
    bucket: AWS_S3_BUCKET,
    endpoint: AWS_S3_ENDPOINT,

    /**
     * Some S3 Compatible API may not work with aws4fetch, set service to 's3' fix it.
     */
    service: 's3'
  },

  /**
   * Basic authentication setup, disabled by default.
   * 
   * Due to security reason, we recommend you declare AUTH_NAME and AUTH_PASS as Cloudflare Workers'
   * Secret Environment Variables and uncomment following lines.
   * 
   * auth.enabled   Enable Basic Auth or not
   * AUTH_NAME      Basic Auth's username
   * AUTH_PASS      Basic Auth's password
   */
  auth: {
    enabled: false,
    // name: AUTH_NAME,
    // pass: AUTH_PASS,

    /**
     * RegExp for basic auth credentials
     * 
     * credentials  = auth0scheme 1*SP token68
     * auth-scheme  = "Basic" ; case insensitive
     * token68      = 1*( ALPHA / DIGIT / "-" / "." / "_" / "~" / "+" / "/" ) *"="
     */
    credentialsRegExp: /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/,

    /**
     * RegExp for basic auth user/pass
     * 
     * user-pass    = userid ":" password
     * userid       = *<TEXT excluding ":">
     * password     = *TEXT
     */
    userPassRegExp: /^([^:]*):(.*)$/,

    /**
     * WWW-Authenticate header
     */
    wwwAuthenticate: 'Basic realm="User Visible Realm"'
  }
}

export default config