import OAuth from 'oauth-1.0a';

const oauth = OAuth({
  consumer: {
    public: 'pB4k5oDyjH0Mmtqm60Ydgg',
    secret: 'NeXHLDREz9LXSEJW41YbJ29As-0'
  },
  signature_method: 'HMAC-SHA1'
});

const url = "https://api.yelp.com/v2/";

const token = {
  public: 'Fldyg-IVzmJdfY7DL7wWv42MOS8hbt99',
  secret: 'rev5cCt25MbKM6bP9aOnqurWJaY'
};

class YelpWrapper {
  static prepareSearch(term, category) {
    const requestData = {
        url: url + "search/?term=" + term + "&category_filter=" + category + encodeURIComponent("&location=Los Angeles, CA"),
        method: "POST"
    };
    return {
      requestData: requestData,
      headers: oauth.toHeader(oauth.authorize(requestData, token))
    };
  }
}

export default YelpWrapper;
