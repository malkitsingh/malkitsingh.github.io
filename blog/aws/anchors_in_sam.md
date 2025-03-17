# Using YAML Anchors and Aliases in AWS SAM Templates

## Introduction

While working with `Typescript` to build lambda functions using `AWS SAM`, I encountered the challenge of having to replicate the `Metadata` attribute for every Lambda function within the stack. Attempts to utilize the `Globals` section in the SAM template proved futile, as it isn't supported for this purpose. Here's how to solve this issue using `Metadata`section in SAM template.

## Understanding YAML Anchors and Aliases

YAML anchors and aliases function similarly to variables in programming, allowing you to define a set of properties once and reference them multiple times throughout your YAML file.

### Defining an Anchor

```yaml
personName:
  type: object
  properties: &person-name-properties
    firstName:
      type: string
    lastName:
      type: string
```

In this snippet, the `properties` attribute of the `personName` schema is assigned an anchor named `person-name-properties`.

### Referencing an Anchor with an Alias

```yaml
person:
  type: object
  properties:
    name:
      type: object
      properties: *person-name-properties
```

When processed, the `person` object expands to:

```yaml
person:
  type: object
  properties:
    name:
      type: object
      properties:
        firstName:
          type: string
        lastName:
          type: string
```

### Extending and Overriding Properties

YAML allows the merging (`<<`) of anchors with additional properties, facilitating customization:

```yaml
person:
  type: object
  properties:
    name:
      type: object
      properties:
        <<: *person-name-properties
        firstName:
          type: string
          minLength: 3
        middleName:
          type: string
```

The resulting structure is:

```yaml
person:
  type: object
  properties:
    name:
      type: object
      properties:
        firstName:
          type: string
          minLength: 3
        lastName:
          type: string
        middleName:
          type: string
```

## Applying YAML Anchors in SAM Templates

Attempting to define the ESBuild configuration at the root level and reference it in functions might seem straightforward:

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Layerless ESBuild Example
Transform:
  - AWS::Serverless-2016-10-31

esbuild: &esbuild
  BuildMethod: esbuild
  BuildProperties:
    Format: esm
    Minify: false
    OutExtension:
      - .js=.mjs
    Target: es2020
    Sourcemap: false
    EntryPoints:
      - index.mjs
    Banner:
      - js=import { createRequire } from 'module'; const require = createRequire(import.meta.url);

Resources:
  EchoFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/functions/echo
      Runtime: nodejs20.x
      Handler: index.handler
    Metadata: *esbuild
```

However, SAM enforces strict validation during deployment, and placing anchors at the root level can lead to errors. Notably, these issues may not surface during the `sam build` phase but will cause deployment failures.

## Recommended Approach

To effectively utilize YAML anchors within SAM templates, define the anchor within the `Metadata` section of the function itself:

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Layerless ESBuild Example
Transform:
  - AWS::Serverless-2016-10-31
Metadata:
  esbuild-properties: &esbuild-properties
    Format: esm
    Minify: false
    OutExtension:
      - .js=.mjs
    Target: es2020
    Sourcemap: false
    EntryPoints:
      - index.mjs
    Banner:
      - js=import { createRequire } from 'module'; const require = createRequire(import.meta.url);
  esbuild: &esbuild
    BuildMethod: esbuild
    BuildProperties: *esbuild-properties

Resources:
  EchoFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/functions/echo
      Runtime: nodejs20.x
      Handler: index.handler
    Metadata: *esbuild
```

### Extending or Overwriting Properties

To customize configurations for specific functions, you can merge the base properties and override as needed:

```yaml
Resources:
  EchoFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/functions/echo
      Runtime: nodejs20.x
      Handler: index.handler
    Metadata:
      <<: *esbuild
      BuildProperties:
        <<: *esbuild-properties
        Minify: true
        External:
          - '@aws-sdk/*'
```

Here, the `EchoFunction`:

- Inherits the base ESBuild configuration.
- Overrides the `Minify` property to `true`.
- Adds an `External` property specifying external dependencies.

## Conclusion

By leveraging standard YAML features and appropriately utilizing the SAM `Metadata` property, you can create reusable YAML snippets within your SAM templates. This approach:

- Significantly reduces template size.
- Minimizes the risk of errors by standardizing configurations across the file.

Embracing YAML anchors and aliases enhances the maintainability and scalability of your serverless applications.

