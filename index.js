const core = require('@actions/core');
const github = require('@actions/github');

try {
  const ueroot = core.getInput('ueroot');
  const script = core.getInput('script');
  const target = core.getInput('target');
  const projectsroot = core.getInput('projectsroot');
  const outputdir = core.getInput('outputdir');
  const { exec, spawn } = require('child_process');
  
  if (ueroot.includes('\'') || ueroot.includes('"') || script.includes('\'') || script.includes('"') || target.includes('\'') || target.includes('"') || projectsroot.includes('\'') || projectsroot.includes('"') || outputdir.includes('\'') || outputdir.includes('"'))
  {
     core.setFailed("Invalid characters in string");
  }
  
  var uatpath = ueroot + "/Engine/Build/BatchFiles/RunUAT.sh";
  if (process.platform === "win32")
  {
    uatpath = ueroot += "\\Engine\\Build\\BatchFiles\\RunUAT.bat"
  }

  exec('"' + uatpath + '" BuildGraph -Script="' + script + '" -Target="' + target + '" -set:ProjectsRoot="' + projectsroot + '" -set:OutputDir="' + outputdir + '"', (err, stdout, stderr) => {
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
