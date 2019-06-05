import React from 'react';
import './NewsDetails.scss';

export default class NewsDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            news: {
                title: 'This is a dummy title',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut auctor nisl, eget egestas magna. Morbi odio nisi, commodo nec nulla sit amet, gravida luctus mauris. Nulla mi nulla, aliquam tincidunt ante in, malesuada pretium diam. Donec semper, arcu ut congue ultricies, ipsum sem pellentesque est, a sodales lectus libero vel ante. Nunc arcu augue, fermentum quis semper vitae, venenatis eleifend massa. Curabitur molestie tempus semper. Aliquam erat volutpat. Praesent a magna pellentesque, posuere velit vitae, porta ante. Quisque finibus massa accumsan vestibulum mattis. Etiam molestie viverra eros, a fermentum leo pulvinar efficitur. Fusce mi est, viverra vel bibendum sed, feugiat sit amet lacus. Etiam imperdiet augue vel ipsum malesuada euismod. Praesent at lacus vel massa fringilla euismod sit amet ac turpis. Suspendisse varius, justo et finibus pulvinar, urna purus condimentum metus, id blandit enim urna at sem. Donec scelerisque leo semper elit cursus iaculis. Pellentesque semper pellentesque pretium.

                Nulla eget ipsum quis augue elementum dapibus at gravida ante. Integer vel eros ut leo porttitor fringilla. Donec consectetur blandit scelerisque. Etiam mollis eget massa quis ornare. Etiam ultricies efficitur ultrices. Ut lorem nisi, dignissim vel risus non, efficitur laoreet eros. Sed pellentesque dui eu metus ultricies euismod sed at felis. Nunc a justo finibus dui commodo efficitur eu quis tellus. Maecenas quis porttitor sapien.
                
                Nullam nec velit bibendum, tempus augue sed, malesuada arcu. Quisque vitae nunc libero. Fusce faucibus nisl a ipsum mollis, ut ultricies velit placerat. Donec molestie bibendum justo sed dignissim. Etiam varius, massa a ullamcorper auctor, augue velit gravida lacus, et porttitor velit tellus tincidunt felis. Aliquam vitae posuere est. Ut venenatis mi risus, eu vehicula est aliquet sit amet. Curabitur laoreet ex eget quam ullamcorper posuere. Curabitur aliquam, est id feugiat bibendum, felis nisi convallis felis, et vestibulum nulla metus nec metus. Fusce bibendum tincidunt placerat. Nam viverra sit amet felis a mattis. Aliquam consectetur nisi nisi, commodo elementum risus posuere eget. In et luctus quam, vitae condimentum dolor. Ut tempor in tellus id gravida.
                
                Aliquam in justo ullamcorper, accumsan enim in, faucibus risus. Maecenas accumsan felis enim, id egestas neque porta nec. Etiam nec risus volutpat, interdum est sed, suscipit nibh. Duis porttitor rutrum semper. Nam viverra tellus vitae elementum ultrices. Nunc ac tincidunt dolor. Sed sodales porttitor fringilla. Donec eleifend feugiat mattis. Nullam sagittis ipsum vitae tortor commodo pulvinar. Sed neque diam, malesuada a mollis ut, lobortis id odio. Donec venenatis ante ut eros sodales, vel scelerisque quam mattis. Praesent imperdiet nisi enim, ut molestie libero auctor vel. Quisque non faucibus est. Sed interdum dictum urna, et ornare neque pretium et. Fusce faucibus lorem eu sagittis vestibulum.
                
                Cras scelerisque finibus nisl, et fringilla massa imperdiet in. Phasellus vehicula tortor quis luctus ultricies. Morbi porta rhoncus eros vel pretium. Pellentesque sed ante vulputate, luctus diam a, porttitor arcu. Vivamus eu consectetur ligula, a finibus odio. Donec massa augue, varius et elit vitae, eleifend vehicula velit. Duis vitae est sit amet velit accumsan aliquam. Aenean vitae malesuada turpis. Vestibulum vitae egestas mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante felis, tincidunt vitae lectus eu, hendrerit fringilla justo. Praesent lacinia feugiat sollicitudin. Nullam non turpis aliquam, tincidunt eros vitae, dictum quam. Morbi vel vestibulum tortor, a semper augue.`,
                publishedOn: '21st of March'
            }
        };
    }

    componentDidMount() {
        if (this.props.computedMatch.params.id) { 
            // get news by id
        }
    }

    render() {
        return (
            <div className="news-details-holder">
                <div className="row p-3">
                    <div className="col-8">
                        <h4>{this.state.news.title}</h4>
                    </div>
                    <div className="col-4 text-right">
                        <small>{this.state.news.publishedOn}</small>
                    </div>
                </div>
                <hr/>
                <div className="row p-4">
                    <div className="col-12">
                        <p>{this.state.news.content}</p>
                    </div>
                </div>            
            </div>
        );
    }
}