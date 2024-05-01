// Should be available in 1.23 shortly
// See https://github.com/go-gitea/gitea/pull/28111
// Fixes #14299

// My earlier PR #20208 went too long and became messy, so I am closing that one and will be splitting the work in smaller chunks.

// This PR includes all the endpoints for the Projects

//  POST /user/projects
//  POST /orgs/{org}/projects
//  POST /repos/{owner}/{repo}/projects
//  GET /user/projects
//  GET /orgs/{org}/projects
//  GET /repos/{owner}/{repo}/projects
//  GET /projects/{id}
//  PATCH /projects/{id}
//  DELETE /projects/{id}
// For all the endpoints related to Boards I will be raising another PR for the same.

// create
// POST /api/v1/repos/{owner}/{repo}/projects

// get
// GET /api/v1/repos/{owner}/{repo}/projects/{project_id}

// update
// PATCH /api/v1/repos/{owner}/{repo}/projects/{project_id}

// delete
// DELETE /api/v1/repos/{owner}/{repo}/projects/{project_id}
