Project Two — 

Blog — Very Subnormal Blogging Platform - A platform whose name conveys the quality of its build

Keeping the end in mind: I need a blogging platform that does a few things. Allows for user authentication—this is paramount and probably the first bit of functionality I will try to implement, which should be a challenge seeing as I’m not entirely sure how to do that yet. The user will need to sign up using his/her name, email and password. The user will login with email and password. Before logging in, the user will see the index/signup/login page and a list of publicly available blogs in the Very Subnormal Blogging Platform that the has viewing access to but not editing access. 

When the user signs up/logs in, the user will be brought to a user index page that will show links to all of the user’s previously published blogs (which will direct the user to a show user view of the blogs with a link to an editing/update page), as well as a button for creating a new blog that will redirect the user to a blogging new page with a few inputs/text areas for filling in the new blog’s content. The user will be able to save the blog to the user only, non-public index page. Once satisfied with a blog post on the new/edit/update page, there will be a link to publish the blog to a publicly available show page.

Recap: The blog will need …
	- Signup/login/authentication page (root index page)
	- User-only index page, contains links of saved posts that link to new/edit/update page for blogging 
	- New/edit/update page for new blogs … contains link to save blog to user-only index page and link to public the blog to a public show page
	- Public show page for each blog post … should be read only and link to a public index page with all posts by the blogger
	- Index/all posts by user page … should have no editing capabilities for non-users … should only link to individual blog posts show page
	- Edit/update/delete functionality that will update both user-only and public views 

Models: 

Right now, I think I’ll go with the minimum of two—a user model and a blog post model. They should look something like this:
User: 

	var user = new User({
		name : {type: String, required: true},
		email  : {type: String, unique: true, required: true},
		password : {type: String, required: true),
		blog : {
			create/user : [blogSchema]
			public : [blogSchema]
			}
	})

Blog: 

	var blog = new Blog({
		title : { type: String, unique: true, required: true },
		hed : {type : String, required: true},
		dek : {type : String, required: true},
		date : {type : Date, required: true }
	})

When a user goes to the new/update/edit page for their blog, when the user saves the blog it should get pushed into the blog.create array. This should show only on the user’s index of blogs page. When the user chooses to publish the blog on the public index and show pages, the post route should find a blog from the blog.create array by its id and push it into the blog.public array. There’s also going to need to be some edit/update functionality for publicly available blogs, so that if the user edits/updates/saves a publicly published blog, the blog will update in the blog.create array AND the blog.public array. Same thing goes for delete … if the user deletes a blog in his/her user-only index or create/edit/update page (which maybe I should separate, now that I think about it), the blog post will be removed form the blog.create array and the blog.public array.  