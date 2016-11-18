#Run this periodically to see if there is a new version
bower install photoshelter/github-templates
mkdir -p .github
mv bower_components/github-templates/issue_template.md .github/
mv bower_components/github-templates/pull_request_template.md .github/
rm -rf bower_components/github-templates
