$WHURL = "$(DISCORD_WH_URL)"

$ReqBody = @{
  content = "$(Build.QueuedBy) queued a build for the $(Build.Repository.Name) repository on the ``$(Build.SourceBranchName)`` branch.";
  embeds = @(
    @{
      title = '$(Build.DefinitionName)';
      description = "Build on ``$(Build.SourceBranchName)`` branch has completed.";
      url = 'https://dev.azure.com/4lch4/Ansel/_build/results?buildId=$(Build.BuildId)';
      fields = @(
        @{
          name = 'Job Status';
          value = '$(Agent.JobStatus)';
        },
        @{
          name = 'Build Id';
          value = '$(Build.BuildId)';
        }
      )
    }
  )
}

$Json = $ReqBody | ConvertTo-Json -Depth 10 -Compress

Write-Host $Json

Invoke-RestMethod -Uri $WHURL -Method Post -ContentType 'application/json' -Body $Json