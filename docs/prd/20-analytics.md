# 20 — Analytics Event Taxonomy

What we measure, how it’s named, what properties travel with each event. Using Plausible (or Fathom). Cookie-less; aggregated.

## 27.1 Naming conventions

- `snake_case` for event names.
- **Structure:** `{noun}_{verb}` or `{noun}_{adjective}`. Examples: `fund_viewed`, `newsletter_submitted`, `search_performed`.
- Properties: descriptive names, values are strings or small integers. Don’t send PII.

## 27.2 Event catalogue

### Navigation / routing

| **Event** | **Properties** | **When** |
| --- | --- | --- |
| page_viewed | path, referrer, section | Auto on every page (built-in) |
| outbound_click | href, destination_domain, location_on_page | Click on any external link |
| portal_click | location (header/footer/fund-detail/home-cta), fund_slug? | Click on anything targeting portal.creativenz.govt.nz |

### Funding

| **Event** | **Properties** |
| --- | --- |
| fund_viewed | fund_slug, fund_category, status |
| calendar_filtered | filters_applied (comma list), result_count |
| fund_finder_started | entry_point |
| fund_finder_step_completed | step_number, answer |
| fund_finder_completed | strong_match_count, also_consider_count |
| fund_finder_exit | step_number |
| fund_finder_result_clicked | fund_slug, match_category (strong/also) |
| eligibility_checklist_completed | fund_slug, all_checked (true/false) |

### Search

| **Event** | **Properties** |
| --- | --- |
| search_performed | query_length, query (hashed), result_count |
| search_result_clicked | position, content_type, query_length |
| search_zero_results | query (raw, for CMS team review) |

**Note:** zero-result queries are logged in full because the comms team needs them to close content gaps. All other search queries are hashed to avoid surfacing PII if someone typed their name into search.

### News

| **Event** | **Properties** |
| --- | --- |
| article_viewed | article_slug, category, publish_date |
| article_read_complete | article_slug (fired on scroll to 90%) |
| article_shared | article_slug, platform |
| news_filter_used | filter_type, filter_value |

### Forms

| **Event** | **Properties** |
| --- | --- |
| form_started | form_name |
| form_submitted | form_name |
| form_submission_error | form_name, error_type |
| newsletter_submitted | location (footer/home/article) |
| contact_topic_selected | topic |

### Language

| **Event** | **Properties** |
| --- | --- |
| lang_toggled | from_locale, to_locale, path |
| translation_missing_fallback | path, from_locale (which locale was requested) |

### Accessibility signals

| **Event** | **Properties** |
| --- | --- |
| skip_link_used | (anonymous; count only) |
| reduced_motion_detected | (fired once per session; informational) |

## 27.3 Dashboards

- **Weekly:** top 10 zero-result queries; new 404 paths; portal click-through rate from fund detail pages.
- **Monthly:** funding calendar usage; Fund Finder completion rate; newsletter signup rate by page.
- **Quarterly:** bilingual traffic patterns; content gaps (sections with high exit rate).

## 27.4 Privacy

- No IP storage. No cookies. No cross-site identifiers.
- Plausible’s default anonymisation. Confirm server location complies with CNZ data residency.
- No event contains PII. Audit this quarterly.
