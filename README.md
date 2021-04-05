# Chicago informative map

### Team Members
1. Haoming Chen
2. Steven Domiter

### Final Proposal
**Persona/Scenario:**

Persona - 

Name & Position: Mike Simson, Software developer

Background Description: Mike is a software developer from Los Angeles, California. After his job went fully remote, he wants to move his wife and four kids to a different area in the United States. He has always been drawn to Chicago, Illinois and wants to learn more about it. As a father he wants a wholistic **insights** of Chicago and the ability to **compare** different locations and their livability. He hopes to rank different neighborhoods and find **correlations** in certain areas with the end **goal** of **identifying** a specific neighborhood that he would like to move into.

Though Mike is excited about Chicago his wife has a few other places she would like to move. Since he is recently remote Mike is planning small family trips to each city so his family can decide. Mike is very interested in Chicago, so his **goal** is to make sure the family trip is exciting and shows a great view of Chicago. The trip is a limited amount of time, so he needs to be able to **rank** different points of interest to maximize his family’s time. It would be helpful for him to **identify** a **cluster** of interesting places. He also hopes to find the **outlier** tourist attractions that might give his family the wrong idea. In the visit he also hopes to **compare** neighborhoods with the goal of figuring out where to move.  

Scenario -

Scenario #1:

When Mike arrives at the website, he sees a map centered on Chicago with a control panel to the left. Areas of Chicago are separated by neighborhood, so he **pans** and **zooms** around the area exploring different areas and clicking to **identify** neighborhood names. He uses the **search** feature to find a few neighborhoods he has already **identified** in research. He looks to the left panel and sees optional demographic data that can **reexpress** the main map. The vibrant colors of the different neighborhoods focus his attention on different areas. There is an optional **overlay** that allows him to select the time when data was collected. Tables are visible at the bottom of the screen as a simpler way to **compare** and **identify** **outlier** neighborhoods. The map and tables can be **filtered** to directly compare target neighborhoods. In the end his **goal** of **identifying** the best neighborhoods to live in should be accomplished.   

Scenario #2: 

When Mike arrives at the website he is again greeted with the large map of Chicago and all the different neighborhoods. He immediately looks to the control panel on the left side and uses the **overlay** to **retrieve** different tourist options such as restaurants, points of interest and hotels. The places **resymbolize** the map and large **clusters** are easy to view. By clicking on the place symbols, they can be **identified** and more information appears. He **pans** and **zooms** around the map of Chicago and **identifies** locations in neighborhoods that he is interested in. In the end he accomplishes his **goal** and plans a tour of Chicago for his family. 

**Requirements Document:**

**Representation**

| Index      | Abbreviation title| Description     |
| :---        |    :----:   |          :--- |
| 1 | Basemap | The outline of Chicago (boundary): natural earth, should show different neighborhoods within the city of Chicago.|
| 2 | Crime | Locations and type of crime that occurred in Chicago, can be expressed at different times, use heatmap: _https://raw.githubusercontent.com/RandomFractals/ChicagoCrimes/master/data/2018/Crimes_-_2018.csv_|
| 3 | Points of Interest | Resteraunts, tourist attractions, hotels; all can be manually entered using online information, ratings and pictures can be added using online data | 
| 4 | Ethnicity | Ethnicity composition using census data, expressed with pie chart by neighborhood, change year range |
| 5 | Age | Age information using census data, pie chart, change year range |
| 6 | Poverty/household income | Area poverty/income data using census data and other sources, change year range, choropleth |
| 7 | Schools | Locations of Chicago schools, entered manually, additional information can be addded to get a more wholistic review of the school |
| 8 | Neighborhood rankings | Provide community opinions about different neighborhoods from a variety of sources, change year: https://www.niche.com/places-to-live/search/best-neighborhoods/m/chicago-metro-area/ https://www.homesnacks.com/best-neighborhoods-in-chicago-il/ |

**Interaction**

| Index      | Abbreviation title| Description     |
| :---        |    :----:   |          :--- |
| 1      | Query Panel       |  Filter: Time. Adjust the occur time for a crime (e.g. month, day of week, hour)  |
| 2      | Filter neighborhood       |  Filter: Locations. highlight a neighborhood. Zoom + Pan: Objects. Adjust the selected neighborhood to the center of map  |
| 3   | Attributes brush        | Filter: Objects. Neighborhoods within the brush will be highlighted on the map      |
| 4   | Neighborhood ethnicity         | Sequence: Objects. Rank by the proportion of ethnicity within a neighborhood      |
| 5      | Layer toggle       |  Overlay: Objects. Turn on/off the different layers, including layers for tourist attracting, school, and crime. |
| 6   |Tourist attraction Hover        | Retrieve: Objects. Hover over a tourist attraction to get a short description and opening hours      |
| 7     | Crime hover       | Retrieve: Objects: Hover over a crime to retrieve the short description of that crime, occur time, and types of crime |
| 8     | Search Neighborhood     | Search: Objects. Type in a neighborhood name in the search box and the corresponding neighborhood will be highlighted|
| 9   | Arrange Neighborhood       | Arrange: Objects. User can view the location on the map and view the ranking by neighborhood in the bar chart below    |


**Wireframes:**


Our wireframes can be found in this [file](https://geog573spring2021.s3.amazonaws.com/575Map.pdf).



