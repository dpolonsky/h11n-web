# Website Crawling & SEO Testing Tools

This document lists tools to test how search engines and crawlers will see your website.

## 🔍 Recommended Testing Tools

### 1. **Google Search Console - URL Inspection Tool**
**Best for: Testing how Google sees your pages**

- URL: https://search.google.com/search-console
- Steps:
  1. Add your property: `https://dpolonsky.github.io/h11n-web/`
  2. Verify ownership (HTML file upload or meta tag)
  3. Use "URL Inspection" tool
  4. Enter your URL and click "Test Live URL"
  5. See exactly how Googlebot sees your page

**What it shows:**
- Rendered HTML
- Screenshot of the page
- Mobile usability
- Indexing status
- Any crawl errors

---

### 2. **Google Rich Results Test**
**Best for: Testing structured data and rich snippets**

- URL: https://search.google.com/test/rich-results
- Enter your URL to see:
  - How Google renders your page
  - Structured data detection
  - Mobile-friendliness
  - AMP compatibility

---

### 3. **Bing Webmaster Tools - URL Inspection**
**Best for: Testing how Bing crawls your site**

- URL: https://www.bing.com/webmasters
- Similar to Google Search Console but for Bing
- Shows how Bingbot sees your pages

---

### 4. **Screaming Frog SEO Spider** (Free version available)
**Best for: Comprehensive site crawling**

- URL: https://www.screamingfrog.co.uk/seo-spider/
- Download and run locally
- Crawls your entire site and shows:
  - All URLs found
  - Meta tags
  - Headings structure
  - Images
  - Links
  - Response codes
  - Page titles and descriptions

**How to use:**
1. Download Screaming Frog
2. Enter your site URL: `https://dpolonsky.github.io/h11n-web/`
3. Click "Start"
4. Review the crawl results

---

### 5. **Google Mobile-Friendly Test**
**Best for: Mobile crawlability**

- URL: https://search.google.com/test/mobile-friendly
- Enter your URL
- Shows:
  - Mobile usability issues
  - Page loading speed
  - Mobile rendering

---

### 6. **PageSpeed Insights**
**Best for: Performance and crawlability**

- URL: https://pagespeed.web.dev/
- Enter your URL
- Shows:
  - Performance metrics
  - Accessibility
  - Best practices
  - SEO score
  - How the page renders

---

### 7. **W3C Markup Validator**
**Best for: HTML validation**

- URL: https://validator.w3.org/
- Validates your HTML
- Shows any markup errors that might affect crawling

---

### 8. **Schema Markup Validator**
**Best for: Structured data testing**

- URL: https://validator.schema.org/
- Test if your structured data is valid
- Helps with rich snippets in search results

---

### 9. **Wayback Machine**
**Best for: Historical crawling view**

- URL: https://web.archive.org/
- See how your site was crawled in the past
- Useful for debugging indexing issues

---

### 10. **curl / wget (Command Line)**
**Best for: Quick crawl simulation**

```bash
# Test if robots.txt is accessible
curl https://dpolonsky.github.io/h11n-web/robots.txt

# Test if sitemap is accessible
curl https://dpolonsky.github.io/h11n-web/sitemap.xml

# Get page headers
curl -I https://dpolonsky.github.io/h11n-web/

# Simulate Googlebot user agent
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  https://dpolonsky.github.io/h11n-web/
```

---

## 🎯 Quick Testing Checklist

After deploying, test these:

- [ ] **robots.txt** is accessible: `https://dpolonsky.github.io/h11n-web/robots.txt`
- [ ] **sitemap.xml** is accessible: `https://dpolonsky.github.io/h11n-web/sitemap.xml`
- [ ] **Homepage** loads correctly
- [ ] **Meta tags** are present (check with View Source)
- [ ] **Mobile-friendly** (use Google's tool)
- [ ] **No JavaScript errors** (check browser console)
- [ ] **All links work** (use Screaming Frog)
- [ ] **Page loads quickly** (use PageSpeed Insights)

---

## 📝 Important Notes for Your Site

### Hash-Based Routing Considerations

Your site uses hash-based routing (`#dashboard`). Search engines handle this differently:

1. **Google**: Can crawl hash fragments, but it's better to have static pages
2. **Initial Load**: Search engines will see the file browser content (good!)
3. **Dynamic Pages**: May not be fully indexed since they're JavaScript-generated

### Recommendations:

1. ✅ **Keep file browser visible** - This is great for SEO as it's static content
2. ✅ **Add meta descriptions** - Already added
3. ✅ **Create sitemap.xml** - Already created
4. ✅ **Add robots.txt** - Already created
5. ⚠️ **Consider**: Adding static HTML versions of key pages for better SEO

---

## 🚀 After Testing

1. Submit sitemap to Google Search Console
2. Submit sitemap to Bing Webmaster Tools
3. Monitor crawl errors
4. Check indexing status regularly

---

## 📊 Expected Results

For a static site like yours:
- ✅ Fast crawl times
- ✅ Good mobile scores
- ✅ No server errors
- ✅ All static files accessible
- ⚠️ Dynamic pages may need JavaScript to render (but file browser works without JS)
