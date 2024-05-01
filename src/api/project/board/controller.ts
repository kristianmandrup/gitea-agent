// See https://github.com/go-gitea/gitea/pull/28209
// Fixes #14299

// This PR is the continuation of the #28111

// Adding endpoints for the boards

//  POST /projects/{projectId}/boards
//  GET /projects/{projectId}/boards
//  GET /projects/boards/{boardId}
//  PATCH /projects/boards/{boardId}
//  DELETE /projects/boards/{boardId}

// create
// POST /api/v1/repos/{owner}/{repo}/projects/{project_id}/boards

// get
// GET /api/v1/repos/{owner}/{repo}/projects/{project_id}/boards/{board_id}

// update
// PATCH /api/v1/repos/{owner}/{repo}/projects/{project_id}/boards/{board_id}

// delete
// DELETE /api/v1/repos/{owner}/{repo}/projects/{project_id}/boards/{board_id}

// move issue to column
// POST /api/v1/repos/{owner}/{repo}/projects/{project_id}/boards/{board_id}/moves
