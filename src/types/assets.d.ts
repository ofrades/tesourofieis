// Metro resolves the bundled search corpus to a numeric asset-registry id.
declare module "*.searchdata" {
  const moduleId: number;
  export default moduleId;
}
