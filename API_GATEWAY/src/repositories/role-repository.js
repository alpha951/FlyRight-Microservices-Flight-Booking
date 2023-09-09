const CrudRepository = require("./crud-repository");
const { Role } = require("../models");

class RoleRepository extends CrudRepository {
  constructor() {
    super(Role);
  }

  async getRoleByName(name) {
    const role = await this.model.findOne({ where: { name: name } });
    return role;
  }
}

module.exports = RoleRepository;
