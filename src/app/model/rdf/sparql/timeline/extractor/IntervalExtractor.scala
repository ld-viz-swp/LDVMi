package model.rdf.sparql.timeline.extractor

import java.text.SimpleDateFormat
import java.util.Date

import model.rdf.extractor.QueryExecutionResultExtractor
import model.rdf.sparql.timeline.models.Interval
import model.rdf.sparql.timeline.query.IntervalQuery
import org.apache.jena.query.{QueryExecution, QuerySolution}

import scala.collection.JavaConversions._

class IntervalExtractor extends QueryExecutionResultExtractor[IntervalQuery, Seq[Interval]] {
  def extract(input: QueryExecution): Option[Seq[Interval]] = {
    try {
      val resList = input.execSelect().toList
      Some(resList.map(e => new Interval(
        e.getResource("interval").getURI,
        getDate(e, "begin"),
        getDate(e, "end")
      )))
    }
    catch {
      case e: org.apache.jena.sparql.engine.http.QueryExceptionHTTP => {
        None
      }
    }
  }

  private def getDate(qs: QuerySolution, fieldName: String): Date = {
    val dateFormat = new SimpleDateFormat("yyyy-MM-dd")
    val fieldValue = qs.getLiteral(fieldName).getString()

    val hour = qs.getLiteral(fieldName + "_hour")
    val minute = qs.getLiteral(fieldName + "_minute")
    val second = qs.getLiteral(fieldName + "_second")

    val date = dateFormat.parse(fieldValue)

    if (hour != null) date.setHours(hour.getInt)
    if (minute != null) date.setMinutes(minute.getInt)
    if (second!= null) date.setSeconds(second.getInt)

    return date
  }
}
