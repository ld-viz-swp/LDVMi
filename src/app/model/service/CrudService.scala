package model.service

import model.entity.{CustomUnicornPlay, IdEntity, IdEntityTable}
import model.repository.CrudRepository
import CustomUnicornPlay._
import CustomUnicornPlay.driver.simple._
import play.api.db.slick.Session

trait CrudService[
  Id <: BaseId,
  E <: IdEntity[Id],
  ETable <: Table[E] with IdEntityTable[Id, E],
  R <: CrudRepository[Id, E, ETable]
]{

  protected def repository: R

  def save(entity: E)(implicit session: Session) = repository.save(entity)

  def saveAll(entities: Seq[E])(implicit session: Session) = repository.saveAll(entities)

  def findById(id: Id)(implicit session: Session) = repository.findById(id)

}
