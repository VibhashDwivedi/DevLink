import React from 'react'
import '../css/createpost.css'
import Header from './Header'
const CreatePost = () => {
  return (
       <div>
<Header/>
  <div class="container py-md-3 container--narrow">
        <form action="#" method="post">
            <div class="form-group">
                <label for="post-title" class="text-muted mb-1"><small>Title</small></label>
                <input required name="title" id="post-title" class="form-control form-control-lg form-control-title" type="text" autocomplete="off"/>
            </div>

            <div class="form-group">
                <label for="post-body" class="text-muted mb-1"><small>Developer Content</small></label>
                <textarea required name="body" id="post-body" class="form-control tall-textarea body-content" type="text" autocomplete="off"></textarea>
            </div>

            <button class="btn btn-info mt-2">Publish Post</button>
        </form>
    </div>
  </div>

  )
}

export default CreatePost