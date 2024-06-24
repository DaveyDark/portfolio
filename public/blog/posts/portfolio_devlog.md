## How it started

![Framer Motion Logo](/blog/media/framer_motion.png)

My initial goal was to create a portfolio website to accompany my resume,
so I came up with a creative animation design for the home page.
Initially I managed to do most of it in just CSS but then I decided
to use Framer Motion which quickly replaced my CSS animations and offered
more flexibility allowing me to orchestrate the animations by adding delays
and easily tweaking durations. And most importantly, it allowed me to introduce
amazing page transitions with it's entry and exit states which really improved
the feel of the website.
Gradually, I created a navbar and further pages with a similar style.

## Then I realized

![Diagram showing relation of frontend, API and Backend](/blog/media/api_diagram.png)

I then understood that I would need to regularly contribute to this content while I was getting ready to create the projects
and blog sites. It wasn't dynamic enough to need a whole database, and if I ended up connecting with the database,
I would also need to construct a backend API for the website, which was well beyond the project's scope that I had in mind.
It would have also significantly extended the amount of time I required to finish this.
After that, I gave it some thought and wondered if it would be worth it to put in a lot of effort now to have it easier later on,
as creating pages by hand for each project and post would also take a lot of time.

## Coming to a compromise

![Gatsby and astro](/blog/media/gatsby_astro.png)

After giving it some thought, I then considered creating the dynamic material, such as projects and posts,
using a content management system (CMS) or static site generator. As I had no prior experience with either of these,

However, after reading both of their documents, I realized there were even more issues.
First of all, moving my existing code to them wouldn't be easy, and secondly, since they render static html/css/js rather than react,
they wouldn't have the Virtual DOM at all.
This presented a problem because the react animation library I was using, framer motion, depended on the Virtual DOM events
like component mounted and unmounted to handle the animations and page transitions.
I wasn't prepared to lose those because I had spent a long time creating them and they were also a major draw for visitors to my website.
I spent more time researching if I could get it to work somehow with either of these frameworks but eventually I realized
I was just wasting more time.

## The simpler solution

![JSON Object holding project data](/blog/media/json_solution.png)

Eventually it dawned on me that, since the data isn't very big or dynamic, why not just store it all in a public JSON object?
That way, I could add to it with relative ease and it wouldn't need to be updated too frequently to interfere with
the git repository or deployment. It would also be simple for me to access and use without requiring a backend or API.
In order to make the blog entries easily accessible and embeddable in the website,
I also chose to use markdown for them and placed them in the static public folder.
After that, all I needed to do was loop through and generate routes dynamically using the JSON data file.

After that, everything I did went extremely well. It not only worked as I needed it to,
but I believe it was a better solution than the other possibilities because it is local to the server
and doesn't create any latency issues due to its small size, making it work really quickly and consistently.
The functionality of my website would have been somewhat compromised if I had used a static site instead of a database
that was hosted elsewhere. This proved to be the ideal resolution in the end.

## Conclusion

![Illustration showing scalability](/blog/media/scalability_illustration.png)

Ultimately, what I took up from this was that not everything you develop has to be lightning fast or infinitely scalable.
Time is another precious resource that you wind up losing by putting all of this effort into a project that, in the worst scenario,
would not even utilize 1% of the capabilities you added. We constantly hear that using the newest and most scalable technologies
is essential to creating a good project that will last and be maintainable, but rather than mindlessly adhering to the purportedly
best practices of the industry, we should take other project-related factors into consideration and determine whether we really need them.
