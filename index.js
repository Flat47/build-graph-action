const core = require('@actions/core');
const github = require('@actions/github');

try {
  const script = core.getInput('script');
  const target = core.getInput('target');
  const projectsroot = core.getInput('projectsroot');
  const outputdir = core.getInput('outputdir');
  const { exec, spawn } = require('child_process');
  
  if (script.includes('\'') || script.includes('"') || target.includes('\'') || target.includes('"') || projectsroot.includes('\'') || projectsroot.includes('"') || outputdir.includes('\'') || outputdir.includes('"'))
  {
     core.setFailed("Invalid characters in string");
  }
  
  // TODO this seems pretty insecure.
  exec('"D:\\UnrealEngine\\Engine\\Build\\BatchFiles\\RunUAT.bat" BuildGraph -Script="' + script + '" -Target="' + target + '" -set:ProjectsRoot="' + projectsroot + '" -set:OutputDir="' + outputdir + '"', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
