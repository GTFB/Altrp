# ALTRP


## Test Version
## Changelog

### 1.2.11
* Added Support for `Soft Deletes` Models

### 1.2.10
* Feature: Altrp Keeps URLs for Redirecting After Login
* Added Transparent Background for Select Widget

### 1.2.9
* Added new Plugins Hooks
  1. `template_updated`
  2. `template_before_delete`
* Optimize Default Styles for Elements & Widgets: Button, Column, Divider, Section, Text
* Fix Sorting Custom Numeric Options

### 1.2.8
* Fix Page Deleting With Roles 
* Fix `Empty` Conditions in Robotizers 
* Fix Some Server Render Issues in Input Widgets 

### 1.2.7
* Added the Ability to Set Up Redirects to Other Sites for Pages
* Fix Image Widget Responsive Size Issue
* Added Decoding When Searching for URL Matches for Pages

### 1.2.6
* Fix and Optimize Styles Loading for Popups 

### 1.2.5
* Fix and Optimize Styles for Cards Templates 

### 1.2.4
* Fix Svg Render Issue in Some Cases

### 1.2.3
* Asynchronous Custom JavaScript Code Loading
* Added page_after_create and page_before_delete Hooks
* Front App Hooks for Plugins
* Fix Global Styles Duplicate Issue
* Fix Popup Height by Content Bug
* Optimize Css Load for Front App
* Added Mustache Support for Inputs Labels
* Added Mailgun Packages for Node 
* Fixed Issues with Pages-Templates Relations After Migration to PostgreSQL

### 1.2.2
* Added disable/enable website indexing
* Fixed duplication pages
* Fixed install plugins
* Fixed dependencies for popup's elements
* Updated popup rendering
* Fixed page role settings
* Fixed textarea background
* Fixed global fonts inheritance

### 1.2.1
* Added Changes in Related Models Before Users Delete
* Added page_after_create and page_before_delete Hooks
* Front App Hooks for Plugins
* Fix `Insert Raw` with SVG Icon for Images
* Extend Settings For Email Sending via `altrpSendMail`
* Added Custom Html for Pages
1. HEAD Start
2. HEAD End
3. BODY Start
4. BODY End

### 1.2.0
* Fix Styles Load for Embedded Templates
* Fix Global Styles
* Fix Some Render Issues
* PostgreSQL Support Added
* Section Structure Variants Selector Added

### 1.1.2
* Fix Template Render Issues
* Fix Popup Position Settings Issues
* Now When Creating Models, Customizers are Created
* Added Telegram Bot Integration

### 1.1.1
* ALTRP Updates via Admin
* Fix Text Widget Renders
* New Error Handler Middleware
* Fix PDF Action
* Fix Customizer Name Issue When Import
* Added API for Plugins in Admin Frontend
* Added Setting Custom Headers for Pages

### 1.1.0
* Fix Some Front App Styles
* Fix Templates Import/Export Issue
* Search and Install Plugins

### 1.0.5
* Fix Sidebars Actions
* Fix Users Update
* Fix Encrypted Settings Issue

### 1.0.4
* Added Nodes to Visual Codes:
  - Document
  - CRUD
  - API
  - Message
  - Customizer
* Fix Bulk
* Fix Some Widgets Render

### 1.0.3
* Fix Page Roles
* Fix Dynamic Variables in SQL-Editor
* Fix Controller Generate Issues

### 1.0.2
* Fix Section Width
* Added Import/Export Visual Codes
* Delete `altrp_ajax` from Request Body
* Added Function to Send Emails

### 1.0.1
* Fix Elements Conditions Display
* Fix HTML in JSON-data for Templates
* Added Styles for Custom Areas
* Show Section Background on Front-end
* Fix Login Action for Elements

### 1.0.0
* Release version

### 0.20.25
* Some Fixes for Section
+ Added Video Background for Sections
* Added Elements Navigator in Editor
* Fix widgets Tabs Switcher, Divider, Content, Heading

### 0.20.24
+ Added Widget Groups
* Fix Visual Codes Pagination Issue
* Restyle Template Condition Popup

### 0.20.23
+ Added Tournament Widget

### 0.20.22
* Bug fixed for Crop Widget, Dropbar Widget, Select Input Widget & Select Tree Input Widget
* Some Customizer Fixes
* Some Admin Fixes

### 0.20.21
* Bug fixed
+ Added Changelog for Updates Page

### 0.20.0
+ Added Categories

### 0.19.10
+ Added Menu Widget Server Side Rendering

### 0.19.9
* Fix Carousel Widgets Synchronize
+ Added `Single Click for Lightbox` and `<img/>` Tag Settings for Carousel Widget

### 0.19.8
* Fix Dropbar with Template Issue
* Fix Import/Export Issues
* Fix Placeholders Color for Widgets
* Fix Icon in Toggle Button In Menu Widget Issue

### 0.19.7
* Fix Lightbox Issues

### 0.19.6
* Fix Input Select Tree Widget
* Fix Autofocus Issue in Input Autocomplete Widget
+ Added Filter Options in Input Autocomplete Widget

### 0.19.5
+ Added Range Slider Filter for Table

### 0.19.4
+ Added Stars Input Widget
+ Added Progressbar Widget
* Fix Sources Auth settings Bug
+ Added Null Placeholder in Select-type Filter In table Widget

### 0.19.3
+ Added Typing and Select Actions in Input Text Autocomplete Widget
* Fix Tooltip for Elements
* Fix Roles/Permissions Access in Data Source Issues

### 0.19.2
* Update Select Components

### 0.19.1
* Fix Customizer and Page Update Issues

### 0.19.0
+ Added Tree Widget and Input Select Tree Widget
* Admin Restyle

### 0.18.1
* Fix Change Label in Node Issue
* Hide Pagination when Page Size Greater then Items
* Fix Regexp Bug in Sliders Widgets on iOs
+ Appearance of Top of Element Actions
+ Appearance of Bottom of Element Actions

### 0.18.0
+ Customizer Module
* Fix Condition Display with Default Hidden Widgets

### 0.17.15
* Fix Hover Card Issue in Card Widget

### 0.17.14
+ Added Icon Widget
+ Fixed Position for Adminbar and "Hide Adminbar" Button

### 0.17.14
+ Added Input Widget Autocomplete
+ Added OIDC Client Action

### 0.17.13
+ Added Params fromURl Hash now store in `altrppage.hashParams`

### 0.17.12
* Fixed Cases of errors when Getting Default Values as Strings and Arrays of Strings in Input Select Widget and Input Multi Select Widget
+ Added Actions when Changing Text in Input Select and Input Multi Select Widget

### 0.17.11
+ Support for Arrays in URL Parameters in `altrppage.params` Object
* Fix Table in Inner Templates Bug

### 0.17.10
+ Market Page to Admin
+ Scheduler Widget

### 0.17.9
* Fix CSS Editor Bug for Elements
* Fix Widget Cards Data Updates
* Fix Wrapper Click Action Now Working in Cards Bug
+ Support for the Same Site Parameter for Session Cookies

### 0.17.8
* Fix Bug with Empty String Setting Value When Template Attempt to Save
* Fix Input Date Default Value with Custom Format

### 0.17.7
* Ability to Customize Button for Next / Previous Pages Without Text in Cards "Widget"
* Fix Link in Heading Widget
* Fix Column Custom Width

### 0.17.6
* Fix SSR Bug with Query Parameters

### 0.17.5
+ Added "Column for Search" and "Param for Search" Settings on Page Settings to Search for Models by an Arbitrary Column
* Fix "Scroll To Element", "Scroll Top" and "Scroll Bottom" Actions

### 0.17.4
* Fix Offset Bug in CurrentEnvironment When Request has Associative Array
* Change Default Login url to /altrp-login

### 0.17.3
+ Added "Update Current Model" Action
* Fix Default Value in Input Select Widget

### 0.17.2
* Fix "Default Value" Settings Bug in Input Multi Select Widget
* Fix Model Settings Updates Bug in Admin
* Fix Create Item Bug in Input Multi Select Widget
* Added Storage Bot and Handler Bot Node

### 0.17.1
* Fix "Remove Item" In Set Data Action
* Fix Input Update in Cards Fields

### 0.17.0
+ Menu Widget and Menu Builder
+ Import Images With Templates
+ Import Widgets Presets and Global Styles Settings With Templates
+ Added  Widgets:
  1. Input Select
  2. Input Multi Select
  3. Input Gallery
  4. Input Slider
  5. Input Range Slider
  6. Image Widget with Lightbox
+ Added "Active" State for Widgets:
  1. Button
  2. Divider
+ Added "Disabled" State for Widgets:
  1. Button
+ Render Template Widget on Server
+ Prevent Update Some Widgets on Forms Update
+ Added Entrance Motion Effect for Widgets
+ Preset Now work with State Style Settings
+ Active Conditions for Menu Items in Menus Setting Admin Page
+ Designer of Telegram Bots;


### 0.15.0
+ "tel" and "mailto" Links
+ Toggle Visually Impaired Action
+ Cache for Pages
+ Page for 404
+ Node js Server for Server Rendering

### 0.14.0
+ Added Accept Filed Type
+ Custom Headers to Form Action
+ Added Video Widget
+ Added User Preset Colors for Color & Gradient Controllers
+ Added the Interface for Setting Parameters with the Mark of Required Parameters
+ Added Revisions to History Panel
+ Added the Ability to Play Sounds in Actions

### 0.13.0
+ Аdd the Template Widget
+ Аdd the Section and Column Link
+ Many URL Params for Pages
+ Added New Custom Code Action
+ Setting Fields Value via Set Actions
+ Two New Text Filter in Table
+ Added History Panel in Editor

### 0.12.1
+ Аdd the Adminbar
+ Insert Custom SVG to Content

### 0.11.16
+ Аdd the Possibility to Delete Widgets with Errors
+ Аdd the Possibility to Hide Export Panel in Dashboard Widget

### 0.11.1
+ Added Action Update Elements & Bulk Form Action
+ Draggable Repeater Items
+ Added File Types:
  Images
  Documents
  Fonts
  SVG
  Archive
  Medias
  Others

### 0.11.00
+ Select All and Clear Value Action
+ Save Current User Storage
+ Fix Bug with "null" Content

### 0.10.16
+ Fix Input Widget Bug

### 0.10.15
+ Blur Actions for Input Widget

### 0.9.0
+ Added Map, Diagram, Dashboards Widgets
+ Added Conditions and Disabled Conditions for Elements by Current User Permissions, Roles
+ Added Conditions for Templates by Current Page
+ Added SQL-Builder
+ Added Import/Export Feature
+ Added Bind Pages with Data Sources


### 0.8.0
+ Added Filters and Sorting in Table Widget
+ Added Auth/not Auth Elements Conditions
+ Redirects Settings to Pages
+ Added Settings for Sorting by Default, and Numbering in order for Table Widgets

### 0.7.0
+ Added Hover, Active, Disabled States Styling
+ Added Breakpoints Settings for Templates
+ Optimize Front App
+ Added Models with Relations and Fields Admin Settings


### 0.6.0
+ Added Related Models Field in Dynamic Content Options
+ Update Related Models Data in Forms
+ Element States in Editor
+ Clear All History for Templates
+ Pagination and Quick Actions for Templates Page
+ Reports Editor
+ Added the Ability to Show Pages to Certain Roles and Redirect to the Main Page if there is no View Permission

### 0.5.0
+ Added Delete/Edit Form Action to Button Widget
+ Added Dynamic Content Option to Text Controllers and Receive Dynamic Data from Server
+ Added New Text Editor in Text Widget

### 0.4.0
+ Added "Added New" Form Action to Button Widget
+ Adding Users Via Admin Interface

### 0.3.2
+ Added Logo on Login Page
* Change Title on Frontend when Navigate
* Fix Frontend Routing

### 0.3.1
* Fix Update Issues

### 0.3.0
+ Model Constructor
+ Models Query for Table Widget

### 0.2.3
+ Added Change Logo in Admin
+ Added Simple Prev/Next Pagination in Table

### 0.2.2
+ Typography Controller
+ Query Controller

### 0.2.1
+ Repeater Controller

### 0.2.0
+ Upgrader
* Fix Update from Server Issues
* Fix Widget not Found Checking
+ Adding and Duplicate Elements by Context Menu

### 0.1.3
+ Update Altrp APP from Server

### 0.1.0
* Alpha Version 
