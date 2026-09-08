# Website design review

This branch contains the proposed website design and copy. The SEO update is already published on `main`; this design is awaiting review.

The homepage opens with the headline and original description of seizures, intrusions and migraines. The phone photo sits in “Ready for the next appointment”: beside the copy on desktop and after it on phones. Founders’ photography stays on About.

The homepage title is “NeuroLog | Neurological tracking | Developed in Melbourne”. The health connection copy names compatible Samsung Health data through Health Connect. A research FAQ explains that app use does not automatically enrol anyone in a study and that participation requires consent.

The design uses Source Sans 3 with the approved lavender and sage palette, concise product copy, app screenshots, and short clinical/research tables. Navigation retains the audience pages and About, with Support, Privacy, Terms and Delete account in the footer. Pilot enquiries still use the existing service.

## Open the full site

From an existing checkout of this repository:

```sh
git fetch origin
git switch website-review
python3 -m http.server 8080
```

Then open http://localhost:8080/. No dependency installation or build is required. You can also open `index.html` directly in your browser. Use the navigation to review the patient, clinician, researcher and About pages.

## Screenshots

[Desktop homepage](homepage-desktop.png) · [Phone homepage](homepage-mobile.png)

The screenshots are review files, stored separately from the website’s image assets.

## Validation

All nine pages passed browser checks at 1440, 390 and 320 CSS pixels (27 page/viewport combinations). Checks covered headings, metadata, images, page overflow, navigation, FAQ controls and required form fields. No live enquiries were submitted.
