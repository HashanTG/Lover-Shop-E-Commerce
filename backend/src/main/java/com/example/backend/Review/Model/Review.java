import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collation = "reviews")
@Data
public class Review{
    @Id


}